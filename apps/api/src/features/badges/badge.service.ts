import { prisma } from "@/core/config/database";

interface Badge {
  name: string;
  description: string;
  url: string;
}

export class BadgeService {
  static async get(filter: "id" | "all", id: string | null) {
    if (filter === "all" && !id) {
      return await prisma.badge.findMany();
    }

    if (filter === "id" && id) {
      return await prisma.badge.findFirst({ where: { id: id ?? "" } });
    }

    return {};
  }

  static async create(data: Badge) {
    return await prisma.badge.create({ data });
  }

  static async update(id: string, data: Partial<Badge>) {
    return await prisma.badge.update({ where: { id }, data });
  }

  static async delete(id: string, deleted: boolean) {
    return await prisma.badge.update({
      where: { id },
      data: { deleted: deleted },
    });
  }
}
