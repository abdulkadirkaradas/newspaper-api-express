import path from "path";
import { createMulter } from "@/core/helper/genericFileUpload";
import { NextFunction, Response, RequestHandler } from "express";
import { ExtendedRequest } from "@/core/helper/genericTypes";

export function fileUploadMiddleware(folderName: string): RequestHandler {
  return (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const postId = req.params.postId;
    const uploadDir = path.resolve(
      process.cwd(),
      "public",
      "uploads",
      folderName,
      userId?.toString() ?? "",
      postId?.toString() ?? ""
    );

    const multerInstance = createMulter(uploadDir, {
      userId: userId ?? undefined,
      relId: postId ?? undefined,
    });

    return multerInstance.array("image", 10)(req, res, next);
  };
}
