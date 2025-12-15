import { Request, Response, NextFunction } from "express";
import { AnnouncementService } from "./announcement.service";

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
      res.json(announcements);
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
      res.status(201).json({ success: true, data: announcement });
    } catch (error) {
      next(error);
    }
  }
}
