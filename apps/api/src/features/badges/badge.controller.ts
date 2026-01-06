import { Request, Response, NextFunction } from "express";
import { BadgeService } from "./badge.service";
import { HTTP_STATUS } from "@/core/helper/constants/http-status.constants";

type BadgeData = {
  name: string;
  description: string;
  url: string;
};
export class BadgeController {
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { filter, id } = req.body;
      const badges = await BadgeService.get(filter, id ?? null);

      res.status(HTTP_STATUS.OK).json(badges);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { data }: { data: BadgeData } = req.body;
      const badge = await BadgeService.create(data);
      res.status(HTTP_STATUS.CREATED).json({ success: true, data: badge });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { data }: { data: Partial<BadgeData> } = req.body;
      const badge = await BadgeService.update(id, data);
      res.status(HTTP_STATUS.OK).json({ success: true, data: badge });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { deleted }: { deleted: boolean } = req.body;
      await BadgeService.delete(id, deleted);
      res.status(HTTP_STATUS.OK).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}
