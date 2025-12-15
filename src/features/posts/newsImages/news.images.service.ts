import path from "path";
import { prisma } from "../../../core/config/database";

interface NewsImage {
  files: Express.Multer.File[];
  userId: string;
  newsId: string;
}

export class NewsImageService {
  static async upload(images: NewsImage) {
    return Promise.all(
      images.files.map((file) => {
        const mimeType = path.extname(file.originalname);
        return prisma.newsImage.create({
          data: {
            name: file.filename,
            ext: mimeType,
            fullpath: `/public/uploads/newsImages/${file.filename}`,
            userId: images.userId,
            newsId: images.newsId,
          },
        });
      })
    );
  }
}
