import path from "path";
import { prisma } from "../../../core/config/database";

interface PostImage {
  files: Express.Multer.File[];
  userId: string;
  postId: string;
}

export class PostImageService {
  static async upload(images: PostImage) {
    return Promise.all(
      images.files.map((file) => {
        const mimeType = path.extname(file.originalname);
        return prisma.postImage.create({
          data: {
            name: file.filename,
            ext: mimeType,
            fullpath: `/public/uploads/postImages/${file.filename}`,
            userId: images.userId,
            postId: images.postId,
          },
        });
      })
    );
  }
}
