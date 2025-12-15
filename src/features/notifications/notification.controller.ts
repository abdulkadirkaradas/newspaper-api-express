import { NotificationService } from "./notification.service";
import { ExtendedRequest } from "../../core/helper/genericTypes";
import { NextFunction, Request, Response } from "express";

export class NotificationController {
  static async getAllNotifications(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userRoleId = req.user?.roleId;
      const { filter } = req.body;
      const notifications = await NotificationService.getAllNotifications(
        userRoleId ?? 0,
        filter
      );
      res.json(notifications);
    } catch (error) {
      next(error);
    }
  }

  static async getNotifications(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { filter } = req.body;
      const notifications = await NotificationService.getNotifications(filter);
      res.json(notifications);
    } catch (error) {
      next(error);
    }
  }

  static async createNotification(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = { ...req.body, userId: req.user.id };
      const notification = await NotificationService.createNotification(body);
      res.status(201).json(notification);
    } catch (error) {
      next(error);
    }
  }

  static async editNotification(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const data = req.body;
      const notifications = await NotificationService.editNotification(
        id,
        data
      );
      res.json(notifications);
    } catch (error) {
      next(error);
    }
  }

  static async changeNotificationStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { isRead } = req.body;

      if (isRead !== null && isRead === undefined) {
        return res.status(400).json({ message: "isRead field is required." });
      }

      const notification = await NotificationService.changeNotificationStatus(
        id,
        isRead
      );
      res.json(notification);
    } catch (error) {
      next(error);
    }
  }

  static async deleteNotification(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const notification = await NotificationService.deleteNotification(id);
      res.json(notification);
    } catch (error) {
      next(error);
    }
  }
}
