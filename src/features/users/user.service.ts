import { prisma } from "@/core/config/database";

interface UserDefaultFilter {
  id?: string;
  email?: string;
  username?: string;
}
interface UpdateUserStatus {
  blocked?: boolean;
  deleted?: boolean;
}

export class UserService {
  static async getUser(filter: UserDefaultFilter) {
    return await prisma.user.findUnique({
      where: {
        id: filter.id,
        email: filter.email,
        username: filter.username,
        blocked: false,
        deleted: false,
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        username: true,
        userBadges: {
          include: {
            badge: {
              select: {
                id: true,
                name: true,
                description: true,
                type: true,
                fullpath: true,
              },
            },
          },
        },
        posts: {
          where: { deleted: false },
          omit: {
            approvedBy: true,
            removedBy: true,
          },
          include: {
            images: {
              select: {
                id: true,
                fullpath: true,
                createdAt: true,
              },
            },
            reactions: {
              select: {
                id: true,
                value: true,
                createdAt: true,
              },
            },
            counterPosts: {
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
          },
        },
      },
    });
  }

  static async updateRole(userId: string, roleId: number) {
    return await prisma.user.update({
      where: { id: userId },
      data: { roleId: roleId },
    });
  }

  static async updateUserStatus(userId: string, status: UpdateUserStatus) {
    return await prisma.user.update({
      where: { id: userId },
      data: { blocked: status.blocked, deleted: status.deleted },
    });
  }
}
