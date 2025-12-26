import { Request, Response, NextFunction } from "express";
import { AnnouncementService } from "./announcement.service";
import { HTTP_STATUS } from "../../core/helper/constants/http-status.constants";

export class AnnouncementController {
  static async getAllAnnouncements(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { filter, id } = req.body;

      const announcements = await AnnouncementService.getAllAnnouncements(
        filter,
        id ?? null
      );
      res.status(HTTP_STATUS.OK).json(announcements);
    } catch (error) {
      next(error);
    }
  }

  static async createAnnouncement(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const announcement = await AnnouncementService.createAnnouncement(
        req.body
      );
      res
        .status(HTTP_STATUS.CREATED)
        .json({ success: true, data: announcement });
    } catch (error) {
      next(error);
    }
  }
}
