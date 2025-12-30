import path from "path";
import { createMulter } from "@/core/helper/genericFileUpload";
import { NextFunction, Response, RequestHandler } from "express";
import { ExtendedRequest } from "@/core/helper/genericTypes";

export function fileUploadMiddleware(folderName: string): RequestHandler {
  return (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const uploadDir = path.resolve(
      process.cwd(),
      "public",
      "uploads",
      folderName
    );

    const userId = req.user?.id;
    const newsId = req.params.newsId;

    const multerInstance = createMulter(uploadDir, {
      userId: userId ?? undefined,
      relId: newsId ?? undefined,
    });

    return multerInstance.array("image", 10)(req, res, next);
  };
}
