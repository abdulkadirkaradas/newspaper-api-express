import { NewsCategoryService } from "./news.category.service";
import { NextFunction, Request, Response } from "express";

export class NewsCategoryController {
  static async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const { filter } = req.body;
      const categories = await NewsCategoryService.getCategory(filter);
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description } = req.body;
      const category = await NewsCategoryService.createCategory({
        name,
        description,
      });
      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const category = await NewsCategoryService.updateCategory(id, {
        name: name ?? null,
        description: description ?? null,
      });
      res.json({ id: category.id, message: "Category updated successfull" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { deleted } = req.body;
      if (deleted === undefined) {
        res.status(400).json({ message: "Please provide delete status!" });
      }

      const category = await NewsCategoryService.deleteCategory(id, deleted);
      res.json({ id: category.id, message: "Category updated successfull" });
    } catch (error) {
      next(error);
    }
  }
}
