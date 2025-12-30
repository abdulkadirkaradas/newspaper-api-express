import { prisma } from "@/core/config/database";

interface PostCategory {
  name: string;
  description: string;
}

interface PostCategoryFilter {
  id?: string;
  deleted?: boolean;
}

export class PostCategoryService {
  static async getCategory(filter: PostCategoryFilter) {
    if (!filter.id && !filter.deleted) {
      return await prisma.postCategory.findMany({ where: { deleted: false } });
    } else if (filter.id && !filter.deleted) {
      return await prisma.postCategory.findUnique({ where: { id: filter.id } });
    }

    return await prisma.postCategory.findMany({
      where: { id: filter.id, deleted: filter.deleted },
    });
  }

  static async createCategory(data: PostCategory) {
    return await prisma.postCategory.create({ data });
  }

  static async updateCategory(
    id: string,
    data: { name?: string; description?: string }
  ) {
    return await prisma.postCategory.update({
      where: { id: id },
      data: { name: data.name, description: data.description },
    });
  }

  static async deleteCategory(id: string, deleted: boolean) {
    return await prisma.postCategory.update({
      where: { id: id },
      data: { deleted: deleted },
    });
  }
}
