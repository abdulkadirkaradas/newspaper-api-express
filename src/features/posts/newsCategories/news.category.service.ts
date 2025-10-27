import { prisma } from "../../../core/config/database";

interface NewsCategory {
  name: string;
  description: string;
}

interface NewsCategoryFilter {
  id?: string;
  deleted?: boolean;
}

export async function getCategory(filter: NewsCategoryFilter) {
  if (!filter.id && !filter.deleted) {
    return await prisma.newsCategory.findMany({ where: { deleted: false } });
  } else if (filter.id && !filter.deleted) {
    return await prisma.newsCategory.findUnique({ where: { id: filter.id } });
  }

  return await prisma.newsCategory.findMany({
    where: { id: filter.id, deleted: filter.deleted },
  });
}

export async function createCategory(data: NewsCategory) {
  return await prisma.newsCategory.create({ data });
}

export async function updateCategory(
  id: string,
  data: { name?: string; description?: string }
) {
  return await prisma.newsCategory.update({
    where: { id: id },
    data: { name: data.name, description: data.description },
  });
}

export async function deleteCategory(id: string, deleted: boolean) {
  return await prisma.newsCategory.update({
    where: { id: id },
    data: { deleted: deleted },
  });
}
