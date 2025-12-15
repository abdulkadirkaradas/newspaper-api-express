import * as newsService from "./news.service";
import { NextFunction, Request, Response } from "express";
import { ExtendedRequest } from "../../../core/helper/genericTypes";

export async function getNews(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { filter } = req.body;
    const userRoleId = req.user?.roleId;
    const news = await newsService.getNews(userRoleId, filter);
    res.json(news);
  } catch (error) {
    next(error);
  }
}

export async function createNews(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const data = { ...req.body, userId: req.user.id };
    const news = await newsService.create(data);
    res.json(news);
  } catch (error) {
    next(error);
  }
}

export async function updateNews(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { newsId } = req.params;
    const data = req.body;
    const roleId = req.user.roleId;
    const news = await newsService.update(roleId, newsId, data);
    res.json(news);
  } catch (error) {
    next(error);
  }
}

export async function changeNewsStatus(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id;
    const { newsId } = req.params;
    const { filter } = req.body;
    const news = await newsService.changeStatus(userId, newsId, filter);
    res.json({
      message: "News status updated successfully",
      news: news,
    });
  } catch (error) {
    next(error);
  }
}
