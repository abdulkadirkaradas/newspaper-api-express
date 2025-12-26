import { Request, Response, NextFunction } from "express";
import { BadgeService } from "./badge.service";
import { HTTP_STATUS } from "../../core/helper/constants/http-status.constants";

export class BadgeController {
  static async getBadges(req: Request, res: Response, next: NextFunction) {
    try {
      const { filter, id } = req.body;
      const badges = await BadgeService.getBadges(filter, id ?? null);

      res.status(HTTP_STATUS.OK).json(badges);
    } catch (error) {
      next(error);
    }
  }

  static async createBadges(req: Request, res: Response, next: NextFunction) {
    try {
      const badge = await BadgeService.createBadge(req.body);
      res.status(HTTP_STATUS.CREATED).json({ success: true, data: badge });
    } catch (error) {
      next(error);
    }
  }
}
