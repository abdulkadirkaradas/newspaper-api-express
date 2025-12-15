import { prisma } from "../../../core/config/database";

interface NewsCategory {
  name: string;
  description: string;
}

interface NewsCategoryFilter {
  id?: string;
  deleted?: boolean;
}

export class NewsCategoryService {
  static async getCategory(filter: NewsCategoryFilter) {
    if (!filter.id && !filter.deleted) {
      return await prisma.newsCategory.findMany({ where: { deleted: false } });
    } else if (filter.id && !filter.deleted) {
      return await prisma.newsCategory.findUnique({ where: { id: filter.id } });
    }

    return await prisma.newsCategory.findMany({
      where: { id: filter.id, deleted: filter.deleted },
    });
  }

  static async createCategory(data: NewsCategory) {
    return await prisma.newsCategory.create({ data });
  }

  static async updateCategory(
    id: string,
    data: { name?: string; description?: string }
  ) {
    return await prisma.newsCategory.update({
      where: { id: id },
      data: { name: data.name, description: data.description },
    });
  }

  static async deleteCategory(id: string, deleted: boolean) {
    return await prisma.newsCategory.update({
      where: { id: id },
      data: { deleted: deleted },
    });
  }
}
