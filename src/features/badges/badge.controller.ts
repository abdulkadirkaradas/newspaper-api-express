import { Request, Response, NextFunction } from "express";
import * as badgeService from "./badge.service";

export async function getBadges(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { filter, id } = req.body;
    const badges = await badgeService.getBadges(filter, id ?? null);

    res.json(badges);
  } catch (error) {
    next(error);
  }
}

export async function createBadges(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const badge = await badgeService.createBadge(req.body);
    res.status(201).json({ success: true, data: badge });
  } catch (error) {
    next(error);
  }
}
