import { PostImageService } from "./post.images.service";
import { ExtendedRequest } from "../../../core/helper/genericTypes";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../../core/helper/constants/http-status.constants";
import { MESSAGES } from "./constants";

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
}
