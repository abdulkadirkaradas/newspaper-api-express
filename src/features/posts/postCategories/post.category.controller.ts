import { HTTP_STATUS } from "../../../core/helper/constants/http-status.constants";
import { PostCategoryService } from "./post.category.service";
import { NextFunction, Request, Response } from "express";

export class PostCategoryController {
  static async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const { filter } = req.body;
      const categories = await PostCategoryService.getCategory(filter);
      res.status(HTTP_STATUS.OK).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description } = req.body;
      const category = await PostCategoryService.createCategory({
        name,
        description,
      });
      res.status(HTTP_STATUS.CREATED).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const category = await PostCategoryService.updateCategory(id, {
        name: name ?? null,
        description: description ?? null,
      });
      res
        .status(HTTP_STATUS.OK)
        .json({ id: category.id, message: "Category updated successfull" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { deleted } = req.body;
      if (deleted === undefined) {
        res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ message: "Please provide delete status!" });
      }

      const category = await PostCategoryService.deleteCategory(id, deleted);
      res
        .status(HTTP_STATUS.OK)
        .json({ id: category.id, message: "Category updated successfull" });
    } catch (error) {
      next(error);
    }
  }
}
