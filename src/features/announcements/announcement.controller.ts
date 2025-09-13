import { Request, Response, NextFunction } from "express";
import * as announcementService from "./announcement.service";

export async function getAllAnnouncements(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { filter, id } = req.body;

    const announcements = await announcementService.getAllAnnouncements(
      filter,
      id ?? null
    );
    res.json(announcements);
  } catch (error) {
    next(error);
  }
}

export async function createAnnouncement(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const announcement = await announcementService.createAnnouncement(req.body);
    res.status(201).json({ success: true, data: announcement });
  } catch (error) {
    next(error);
  }
}
