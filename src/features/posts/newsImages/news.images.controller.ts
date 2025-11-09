import * as newsImageService from "./news.images.service";
import { ExtendedRequest } from "../../../core/helper/genericTypes";
import { NextFunction, Request, Response } from "express";

export async function uploadImages(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id;
    const { newsId } = req.params;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      res.status(400).json({ message: "No files uploaded" });
      return;
    }

    const savedFiles = await newsImageService.upload({
      files: files,
      userId: userId,
      newsId: newsId,
    });

    let message = savedFiles
      ? "Files uploaded successfully"
      : "An error occurred";
    let status = savedFiles ? 200 : 500;

    res.status(status).json({
      message: message,
    });
  } catch (error) {
    next(error);
  }
}
