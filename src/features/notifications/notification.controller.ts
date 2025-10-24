import * as notificationService from "./notification.service";
import { ExtendedRequest } from "../../core/helper/genericTypes";
import { NextFunction, Request, Response } from "express";

export async function getAllNotifications(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userRoleId = req.user?.roleId;
    const { filter } = req.body;
    const notifications = await notificationService.getAllNotifications(
      userRoleId ?? 0,
      filter
    );
    res.json(notifications);
  } catch (error) {
    next(error);
  }
}

export async function getNotifications(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { filter } = req.body;
    const notifications = await notificationService.getNotifications(filter);
    res.json(notifications);
  } catch (error) {
    next(error);
  }
}

export async function createNotification(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const body = { ...req.body, userId: req.user.id };
    const notification = await notificationService.createNotification(body);
    res.status(201).json(notification);
  } catch (error) {
    next(error);
  }
}

export async function editNotification(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data = req.body;
    const notifications = await notificationService.editNotification(id, data);
    res.json(notifications);
  } catch (error) {
    next(error);
  }
}

export async function changeNotificationStatus(
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

    const notification = await notificationService.changeNotificationStatus(
      id,
      isRead
    );
    res.json(notification);
  } catch (error) {
    next(error);
  }
}

export async function deleteNotification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const notification = await notificationService.deleteNotification(id);
    res.json(notification);
  } catch (error) {
    next(error);
  }
}
