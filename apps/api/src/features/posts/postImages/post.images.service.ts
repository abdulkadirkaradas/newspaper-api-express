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

const API_ORIGIN = process.env.API_ORIGIN ?? "http://localhost:3000";

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
        const normalizedPath = file.path.replace(/\\/g, "/");
        const publicIndex = normalizedPath.indexOf("/public/");
        const relativePath = normalizedPath.substring(publicIndex);
        const fullpath = API_ORIGIN + relativePath;

        return prisma.postImage.create({
          data: {
            name: file.filename,
            mimeType: mimeType,
            fullpath: fullpath,
            postId: images.postId,
          },
        });
      }),
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
