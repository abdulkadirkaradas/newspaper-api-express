import { Request, Response, NextFunction } from "express";
import { AnnouncementService } from "./announcement.service";
import { HTTP_STATUS } from "@/core/helper/constants/http-status.constants";

type AnnouncementData = {
  title: string;
  content: string;
  priority: number;
};
export class AnnouncementController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { filter, id } = req.body;

      const announcements = await AnnouncementService.getAll(
        filter,
        id ?? null
      );
      res.status(HTTP_STATUS.OK).json(announcements);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { data }: { data: AnnouncementData } = req.body;
      const announcement = await AnnouncementService.create(data);
      res
        .status(HTTP_STATUS.CREATED)
        .json({ success: true, data: announcement });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const { data }: { data: Partial<AnnouncementData> } = req.body;

      const announcement = await AnnouncementService.update(id, {
        title: data.title,
        content: data.content,
        priority: data.priority,
      });
      res.status(HTTP_STATUS.OK).json({ success: true, data: announcement });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const { deleted }: { deleted: boolean } = req.body;

      await AnnouncementService.delete(id, deleted);
      res.status(HTTP_STATUS.OK).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}
