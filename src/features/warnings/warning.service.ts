import { prisma } from "../../core/config/database";
import { ROLE } from "../../core/helper/constants/role.constants";

interface Warning {
  userId: string;
  content: string;
  reason: string;
  warningLevel: number;
}

type WarningDefaultFilter = {
  userId?: string;
  id?: string;
};

type WarningAdminFilter = WarningDefaultFilter & {
  warningLevel?: number;
  deleted?: boolean;
};

export class WarningService {
  static async getAllWarnings(role: number, filter: WarningAdminFilter) {
    if (role !== ROLE.ADMIN) {
      return { message: "Only admins can access all warnings." };
    }

    return await prisma.warning.findMany({
      where: {
        id: filter.id,
        userId: filter.userId,
        deleted: filter.deleted,
        warningLevel: filter.warningLevel,
      },
    });
  }

  static async getWarnings(filter: WarningDefaultFilter) {
    if (filter.userId && filter.id) {
      return await prisma.warning.findUnique({
        where: { userId: filter.userId, id: filter.id, deleted: false },
      });
    } else if (filter.userId) {
      return await prisma.warning.findMany({
        where: { userId: filter.userId, deleted: false },
      });
    } else if (filter.id) {
      return await prisma.warning.findUnique({
        where: { id: filter.id, deleted: false },
      });
    }

    return { message: "Please provide user or warning ID!" };
  }

  static async createWarning(data: Warning) {
    return await prisma.warning.create({
      data: data,
    });
  }

  static async editWarning(id: string, data: Partial<Warning>) {
    return await prisma.warning.update({
      where: { id: id },
      data: data,
    });
  }

  static async deleteWarning(id: string) {
    return await prisma.warning.update({
      where: { id },
      data: { deleted: true },
    });
  }
}
