import { prisma } from "@/core/config/database";

interface Announcement {
  title: string;
  content: string;
  priority: number;
}

export class AnnouncementService {
  static async getAllAnnouncements(filter: "id" | "all", id: string | null) {
    if (filter === "all" && !id) {
      return await prisma.announcement.findMany();
    }

    if (filter !== "all" && !id) {
      return {};
    }

    return await prisma.announcement.findUnique({ where: { id: id ?? "" } });
  }

  static async createAnnouncement(data: Announcement) {
    return await prisma.announcement.create({ data });
  }
}
