import { prisma } from "../../core/config/database";

interface Badge {
  name: string;
  description: string;
  type: string;
  ext: string;
  fullpath: string;
}

export async function getBadges(filter: "id" | "all", id: string | null) {
  if (filter === "all" && !id) {
    return await prisma.badge.findMany();
  }

  if (filter === "id" && id) {
    return await prisma.badge.findFirst({ where: { id: id ?? "" } });
  }

  return {};
}

export async function createBadge(data: Badge) {
  return await prisma.badge.create({ data });
}
