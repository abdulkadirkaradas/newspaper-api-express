import * as newsCategoryService from "./news.category.service";
import { NextFunction, Request, Response } from "express";

export async function getCategories(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { filter } = req.body;
    const categories = await newsCategoryService.getCategory(filter);
    res.json(categories);
  } catch (error) {
    next(error);
  }
}

export async function createCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, description } = req.body;
    const category = await newsCategoryService.createCategory({
      name,
      description,
    });
    res.json(category);
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = await newsCategoryService.updateCategory(id, {
      name: name ?? null,
      description: description ?? null,
    });
    res.json({ id: category.id, message: "Category updated successfull" });
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { deleted } = req.body;
    if (deleted === undefined) {
      res.status(400).json({ message: "Please provide delete status!" });
    }

    const category = await newsCategoryService.deleteCategory(id, deleted);
    res.json({ id: category.id, message: "Category updated successfull" });
  } catch (error) {
    next(error);
  }
}
