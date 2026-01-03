import path from "path";
import { prisma } from "@/core/config/database";

interface PostImage {
  files: Express.Multer.File[];
  postId: string;
}

interface PostImageFilter {
  id: string;
  postId: string;
}
interface PostImageDeleteFilter {
  id?: string | string[] | null;
  postId?: string | null;
}

export class PostImageService {
  static async get(filter: PostImageFilter) {
    let where = { ...filter, deleted: false };
    return prisma.postImage.findMany({
      where: where,
    });
  }

  static async upload(images: PostImage) {
    return Promise.all(
      images.files.map((file) => {
        const mimeType = path.extname(file.originalname);
        return prisma.postImage.create({
          data: {
            name: file.filename,
            mimeType: mimeType,
            fullpath: `/public/uploads/postImages/${file.filename}`,
            postId: images.postId,
          },
        });
      })
    );
  }

  static async delete(filter: PostImageDeleteFilter, deleted: boolean) {
    if (Array.isArray(filter.id)) {
      return prisma.postImage.updateMany({
        where: {
          id: { in: filter.id },
          postId: filter.postId!,
        },
        data: {
          deleted: deleted,
        },
      });
    }

    return prisma.postImage.update({
      where: {
        id: filter.id!,
      },
      data: {
        deleted: deleted,
      },
    });
  }
}
