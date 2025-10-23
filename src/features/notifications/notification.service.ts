import { prisma } from '../../core/config/database';

interface Notification {
  userId: string;
  title: string;
  content: string;
  priority: number;
}

export async function getNotifications(id: string | null, role: number | null) {
  if (!id) {
    if (role === 1) {
      return await prisma.notification.findMany({ where: { deleted: false } });
    } else {
      return {
        message: "Only admins can access all notifications. ",
      };
    }
  }

  return await prisma.notification.findFirst({ where: { id: id ?? "" } });
}

export async function createNotification(data: Notification) {
  return await prisma.notification.create({
    data,
  });
}

export async function editNotification(
  id: string,
  data: Partial<Notification>
) {
  return await prisma.notification.update({
    where: { id: id },
    data,
  });
}

export async function changeNotificationStatus(id: string, status: boolean) {
  return await prisma.notification.update({
    where: { id },
    data: { isRead: status },
  });
}

export async function deleteNotification(id: string) {
  return await prisma.notification.update({
    where: { id },
    data: { deleted: true },
  });
}
