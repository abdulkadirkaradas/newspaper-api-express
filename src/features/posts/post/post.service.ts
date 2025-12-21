import { prisma } from "../../../core/config/database";
import { Prisma } from "@prisma/client";

interface Post {
  title: string;
  content: string;
  categoryId: string;
  userId: string;
}

type PostFilter = {
  id?: string;
  userId?: string;
  categoryId?: string;
  priority?: number;
  pinned?: boolean;
  deleted?: boolean;
};

type PostStatusFilter = {
  pinned?: boolean;
  visibility?: boolean;
  deleted?: boolean;
};

type PostVote = 1 | -1;
interface PostVoteParameters {
  postId: string;
  userId: string;
  value: PostVote;
}

export class PostService {
  static async getPost(roleId: number, filter: PostFilter) {
    // Define allowed filter keys based on user role
    const allowedKeys =
      roleId === 3
        ? (["id", "userId", "categoryId"] as (keyof PostFilter)[])
        : ([
            "id",
            "userId",
            "categoryId",
            "priority",
            "pinned",
            "deleted",
          ] as (keyof PostFilter)[]);

    // Build the where clause dynamically, only including allowed keys
    const where: Record<string, any> = {};
    for (const key of allowedKeys) {
      const v = (filter as PostFilter)[key];
      if (v !== undefined && v !== null && v !== "") where[key] = v;
    }

    // Enforce at least one filter for roleId 3 (regular users)
    if (roleId === 3 && Object.values(where).length === 0) {
      return "Please provide at least one of the post, user or category ID's!";
    }

    // If no filters are provided, defaults to returning the last 7 days of posts
    if (Object.keys(where).length === 0) {
      where["createdAt"] = {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      };
    }

    prisma
    return await prisma.post.findMany({
      where: where,
      orderBy: {
        createdAt: "desc",
      },
      omit: {
        categoryId: true,
        deleted: true,
        approvedBy: true,
        removedBy: true,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        oppositePostTarget: {
          where: { deleted: false },
          select: {
            id: true,
            targetPost: {
              select: {
                id: true,
                title: true,
                content: true,
                category: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
                createdAt: true,
              },
            },
            targetUser: {
              select: {
                id: true,
                name: true,
                lastname: true,
                username: true,
              },
            },
            createdAt: true,
          },
        },
        images: {
          where: { deleted: false },
          select: {
            id: true,
            fullpath: true,
          },
        },
      },
    });
  }

  static async create(data: Post) {
    return await prisma.post.create({ data });
  }

  static async update(
    roleId: number,
    id: string,
    data: Partial<Omit<Post, "userId">>
  ) {
    const updateData: Partial<typeof data> = { ...data };
    if (roleId === 3 && updateData.categoryId) delete updateData.categoryId;

    return await prisma.post.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        title: true,
        content: true,
        categoryId: true,
        updatedAt: true,
      },
    });
  }

  static async changeStatus(
    userId: string,
    id: string,
    status: Partial<PostStatusFilter>
  ) {
    const data = { ...status, removedBy: status.deleted ? userId : "" };

    return await prisma.post.update({
      where: { id },
      data,
      select: {
        id: true,
        title: true,
        content: true,
        categoryId: true,
        pinned: true,
        visibility: true,
        deleted: true,
        updatedAt: true,
      },
    });
  }

  static async approve(userId: string, id: string) {
    const checkPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!checkPost) throw new Error("Post not found!");

    if (checkPost.visibility && checkPost.approvedBy) {
      throw new Error("Post is already approved!");
    }

    return await prisma.post.update({
      where: { id: id },
      data: { visibility: true, approvedBy: userId },
      select: {
        id: true,
        title: true,
        content: true,
        categoryId: true,
        updatedAt: true,
      },
    });
  }

  static async handleVote({ userId, postId, value }: PostVoteParameters) {
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const existingVote = await tx.postReaction.findUnique({
        where: {
          postId_userId: { userId, postId },
        },
      });

      if (!existingVote) {
        await tx.postReaction.create({
          data: { userId, postId, value },
        });

        await tx.post.update({
          where: { id: postId },
          data: { score: { increment: value } },
        });

        return { action: "CREATED", value };
      }

      if (existingVote.deleted) {
        await tx.postReaction.update({
          where: { id: existingVote.id },
          data: { value, deleted: false },
        });

        await tx.post.update({
          where: { id: postId },
          data: { score: { increment: value } },
        });

        return { action: "RESTORED", value };
      }

      if (existingVote.value === value) {
        await tx.postReaction.update({
          where: { id: existingVote.id },
          data: { deleted: true },
        });

        await tx.post.update({
          where: { id: postId },
          data: { score: { decrement: value } },
        });

        return { action: "REMOVED" };
      }

      const diff = value - existingVote.value;

      await tx.postReaction.update({
        where: { id: existingVote.id },
        data: { value, deleted: false },
      });

      await tx.post.update({
        where: { id: postId },
        data: { score: { increment: diff } },
      });

      return { action: "UPDATED", value };
    });
  }
}
