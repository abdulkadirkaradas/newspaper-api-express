import { NewsService } from "./news.service";
import { NextFunction, Request, Response } from "express";
import { ExtendedRequest } from "../../../core/helper/genericTypes";

export class NewsController {
  static async getNews(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { filter } = req.body;
      const userRoleId = req.user?.roleId;
      const news = await NewsService.getNews(userRoleId, filter);
      res.json(news);
    } catch (error) {
      next(error);
    }
  }

  static async createNews(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = { ...req.body, userId: req.user.id };
      const news = await NewsService.create(data);
      res.json(news);
    } catch (error) {
      next(error);
    }
  }

  static async updateNews(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { newsId } = req.params;
      const data = req.body;
      const roleId = req.user.roleId;
      const news = await NewsService.update(roleId, newsId, data);
      res.json(news);
    } catch (error) {
      next(error);
    }
  }

  static async changeNewsStatus(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user?.id;
      const { newsId } = req.params;
      const { filter } = req.body;
      const news = await NewsService.changeStatus(userId, newsId, filter);
      res.json({
        message: "News status updated successfully",
        news: news,
      });
    } catch (error) {
      next(error);
    }
  }
}
