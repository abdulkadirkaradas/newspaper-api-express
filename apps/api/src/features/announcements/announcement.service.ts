import { prisma } from "@/core/config/database";

interface Announcement {
  title: string;
  content: string;
  priority: number;
}

export class AnnouncementService {
  static async getAll(filter: "id" | "all", id: string | null) {
    if (filter === "all" && !id) {
      return await prisma.announcement.findMany();
    }

    if (filter !== "all" && !id) {
      return {};
    }

    return await prisma.announcement.findUnique({ where: { id: id ?? "" } });
  }

  static async create(data: Announcement) {
    return await prisma.announcement.create({ data });
  }

  static async update(id: string, data: Partial<Announcement>) {
    return await prisma.announcement.update({ where: { id }, data });
  }

  static async delete(id: string, deleted: boolean) {
    return await prisma.announcement.update({
      where: { id },
      data: { deleted: deleted },
    });
  }
}
