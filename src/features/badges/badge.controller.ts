import { Request, Response, NextFunction } from "express";
import { BadgeService } from "./badge.service";

export class BadgeController {
  static async getBadges(req: Request, res: Response, next: NextFunction) {
    try {
      const { filter, id } = req.body;
      const badges = await BadgeService.getBadges(filter, id ?? null);

      res.json(badges);
    } catch (error) {
      next(error);
    }
  }

  static async createBadges(req: Request, res: Response, next: NextFunction) {
    try {
      const badge = await BadgeService.createBadge(req.body);
      res.status(201).json({ success: true, data: badge });
    } catch (error) {
      next(error);
    }
  }
}
