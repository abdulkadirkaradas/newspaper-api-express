import { prisma } from "@/core/config/database";

interface Badge {
  name: string;
  description: string;
  type: string;
  mimeType: string;
  fullpath: string;
}

export class BadgeService {
  static async getBadges(filter: "id" | "all", id: string | null) {
    if (filter === "all" && !id) {
      return await prisma.badge.findMany();
    }

    if (filter === "id" && id) {
      return await prisma.badge.findFirst({ where: { id: id ?? "" } });
    }

    return {};
  }

  static async createBadge(data: Badge) {
    return await prisma.badge.create({ data });
  }
}
