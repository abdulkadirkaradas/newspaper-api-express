import { prisma } from "../../../core/config/database";
import { Prisma } from "@prisma/client";
import { ROLE } from "../../../core/helper/constants/role.constants";
import { MESSAGES } from "./constants";

interface Post {
  title: string;
  content: string;
  opposedToId: string | null;
  categoryId: string | null;
  authorId: string;
}

type PostFilter = {
  id?: string;
  authorId?: string;
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
  authorId: string;
  value: PostVote;
}

export class PostService {
  static async getPost(roleId: number, filter: PostFilter) {
    // Define allowed filter keys based on user role
    const allowedKeys =
      roleId === ROLE.WRITER
        ? (["id", "authorId", "categoryId"] as (keyof PostFilter)[])
        : ([
            "id",
            "authorId",
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
    if (roleId === ROLE.WRITER && Object.values(where).length === 0) {
      return {
        message: MESSAGES.FILTER.ID_REQUIRED,
      };
    }

    // If no filters are provided, defaults to returning the last 7 days of posts
    if (Object.keys(where).length === 0) {
      where["createdAt"] = {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      };
    }

    prisma;
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
        counterPosts: {
          omit: {
            approvedBy: true,
            removedBy: true,
          },
          include: {
            author: {
              select: {
                id: true,
                username: true,
                name: true,
                lastname: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
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
    return await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        opposedToId: data.opposedToId ?? null,
        categoryId: data.categoryId ?? null,
        authorId: data.authorId,
      },
    });
  }

  static async update(
    roleId: number,
    id: string,
    data: Partial<Omit<Post, "authorId" | "opposedToId">>
  ) {
    const updateData: Partial<typeof data> = { ...data };
    if (roleId === ROLE.WRITER && updateData.categoryId)
      delete updateData.categoryId;

    return await prisma.post.update({
      where: { id },
      data: {
        title: updateData.title,
        content: updateData.content,
        categoryId: updateData.categoryId ?? null,
      },
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
    authorId: string,
    id: string,
    status: Partial<PostStatusFilter>
  ) {
    const data = { ...status, removedBy: status.deleted ? authorId : "" };

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

  static async approve(authorId: string, id: string) {
    const checkPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!checkPost) throw new Error(MESSAGES.ERROR.POST_NOT_FOUND);

    if (checkPost.visibility && checkPost.approvedBy) {
      throw new Error(MESSAGES.ERROR.POST_ALREADY_APPROVED);
    }

    return await prisma.post.update({
      where: { id: id },
      data: { visibility: true, approvedBy: authorId },
      select: {
        id: true,
        title: true,
        content: true,
        categoryId: true,
        updatedAt: true,
      },
    });
  }

  static async handleVote({ authorId, postId, value }: PostVoteParameters) {
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const existingVote = await tx.postReaction.findUnique({
        where: {
          postId_authorId: { authorId, postId },
        },
      });

      if (!existingVote) {
        await tx.postReaction.create({
          data: { authorId, postId, value },
        });

        await tx.post.update({
          where: { id: postId },
          data: { score: { increment: value } },
        });

        return { action: MESSAGES.VOTE.CREATED, value };
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

        return { action: MESSAGES.VOTE.RESTORED, value };
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

        return { action: MESSAGES.VOTE.REMOVED };
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

      return { action: MESSAGES.VOTE.UPDATED, value };
    });
  }
}
