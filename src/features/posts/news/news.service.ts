import { prisma } from "../../../core/config/database";

interface News {
  title: string;
  content: string;
  categoryId: string;
  userId: string;
}

type NewsFilter = {
  id?: string;
  userId?: string;
  categoryId?: string;
  priority?: number;
  pinned?: boolean;
  deleted?: boolean;
};

type NewsStatusFilter = {
  pinned?: boolean;
  visibility?: boolean;
  deleted?: boolean;
};

export class NewsService {
  static async getNews(roleId: number, filter: NewsFilter) {
    // Define allowed filter keys based on user role
    const allowedKeys =
      roleId === 3
        ? (["id", "userId", "categoryId"] as (keyof NewsFilter)[])
        : ([
            "id",
            "userId",
            "categoryId",
            "priority",
            "pinned",
            "deleted",
          ] as (keyof NewsFilter)[]);

    // Build the where clause dynamically, only including allowed keys
    const where: Record<string, any> = {};
    for (const key of allowedKeys) {
      const v = (filter as NewsFilter)[key];
      if (v !== undefined && v !== null && v !== "") where[key] = v;
    }

    // Enforce at least one filter for roleId 3 (regular users)
    if (roleId === 3 && Object.values(where).length === 0) {
      return "Please provide at least one of the news, user or category ID's!";
    }

    // If no filters are provided, defaults to returning the last 7 days of posts
    if (Object.keys(where).length === 0) {
      where["createdAt"] = {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      };
    }

    return await prisma.news.findMany({
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
        oppositeNewsTarget: {
          where: { deleted: false },
          select: {
            id: true,
            targetNews: {
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

  static async create(data: News) {
    return await prisma.news.create({ data });
  }

  static async update(
    roleId: number,
    id: string,
    data: Partial<Omit<News, "userId">>
  ) {
    const updateData: Partial<typeof data> = { ...data };
    if (roleId === 3 && updateData.categoryId) delete updateData.categoryId;

    return await prisma.news.update({
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
    status: Partial<NewsStatusFilter>
  ) {
    const data = { ...status, removedBy: status.deleted ? userId : "" };

    return await prisma.news.update({
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
    const checkNews = await prisma.news.findUnique({
      where: { id },
    });

    if (!checkNews) throw new Error("News not found!");

    if (checkNews.visibility && checkNews.approvedBy) {
      throw new Error("News is already approved!");
    }

    return await prisma.news.update({
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
}
