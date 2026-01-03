import { PostImageService } from "./post.images.service";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "@/core/helper/constants/http-status.constants";
import { MESSAGES } from "./constants";

export class PostImageController {
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { filter } = req.body;
      const images = await PostImageService.get(filter);
      res.status(HTTP_STATUS.OK).json(images);
    } catch (error) {
      next(error);
    }
  }

  static async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params;
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ message: MESSAGES.ERROR.NO_FILES_UPLOADED });
        return;
      }

      const savedFiles = await PostImageService.upload({
        files: files,
        postId: postId,
      });

      let message = savedFiles
        ? MESSAGES.RESPONSE.UPLOADED
        : MESSAGES.ERROR.AN_ERROR_OCCURRED;
      let status = savedFiles
        ? HTTP_STATUS.OK
        : HTTP_STATUS.INTERNAL_SERVER_ERROR;

      res.status(status).json({
        id: savedFiles,
        message: message,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { filter, deleted } = req.body;
      const image = await PostImageService.delete(filter, deleted);
      res.status(HTTP_STATUS.OK).json(image);
    } catch (error) {
      next(error);
    }
  }
}
