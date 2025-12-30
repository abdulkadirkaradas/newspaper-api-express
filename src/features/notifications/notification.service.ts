import { prisma } from "@/core/config/database";
import { ROLE } from "@/core/helper/constants/role.constants";
import { MESSAGES } from "./constants";

interface Notification {
  userId: string;
  title: string;
  content: string;
  priority: number;
}

type NotificationDefaultFilter = {
  userId?: string;
  id?: string;
};

type NotificationAdminFilter = NotificationDefaultFilter & {
  priority?: number;
  isRead?: boolean;
  deleted?: boolean;
};

export class NotificationService {
  static async getAllNotifications(
    role: number,
    filter: NotificationAdminFilter
  ) {
    if (role !== ROLE.ADMIN) {
      return { message: MESSAGES.ERROR.UNSIFFICIENT_ROLE };
    }

    return await prisma.notification.findMany({
      where: {
        id: filter.id,
        userId: filter.userId,
        priority: filter.priority,
        isRead: filter.isRead,
        deleted: filter.deleted,
      },
    });
  }

  static async getNotifications(filter: NotificationDefaultFilter) {
    if (filter.userId && filter.id) {
      return await prisma.notification.findUnique({
        where: { userId: filter.userId, id: filter.id, deleted: false },
      });
    } else if (filter.userId) {
      return await prisma.notification.findMany({
        where: { userId: filter.userId, deleted: false },
      });
    } else if (filter.id) {
      return await prisma.notification.findUnique({
        where: { id: filter.id, deleted: false },
      });
    }

    return { message: MESSAGES.FILTER.ID_REQUIRED };
  }

  static async createNotification(data: Notification) {
    return await prisma.notification.create({
      data,
    });
  }

  static async editNotification(id: string, data: Partial<Notification>) {
    return await prisma.notification.update({
      where: { id: id },
      data,
    });
  }

  static async changeNotificationStatus(id: string, status: boolean) {
    return await prisma.notification.update({
      where: { id },
      data: { isRead: status },
    });
  }

  static async deleteNotification(id: string) {
    return await prisma.notification.update({
      where: { id },
      data: { deleted: true },
    });
  }
}
