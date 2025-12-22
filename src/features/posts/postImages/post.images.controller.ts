import { PostImageService } from "./post.images.service";
import { ExtendedRequest } from "../../../core/helper/genericTypes";
import { NextFunction, Request, Response } from "express";

export class PostImageController {
  static async uploadImages(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { postId } = req.params;
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        res.status(400).json({ message: "No files uploaded" });
        return;
      }

      const savedFiles = await PostImageService.upload({
        files: files,
        postId: postId,
      });

      let message = savedFiles
        ? "Files uploaded successfully"
        : "An error occurred";
      let status = savedFiles ? 200 : 500;

      res.status(status).json({
        id: savedFiles,
        message: message,
      });
    } catch (error) {
      next(error);
    }
  }
}
