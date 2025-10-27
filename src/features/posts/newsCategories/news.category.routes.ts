import { checkRole } from "../../../core/middleware/checkRole";
import { Router } from "express";
import { validateRequest } from "../../../core/helper/genericValidation";
import {
  NewsCategoryCreateRequestSchema,
  NewsCategoryUpdateSchema,
} from "./validationScheme";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./news.category.controller";

const router = Router();

router.get("/", [checkRole(["Admin", "Moderator"])], getCategories);
router.post(
  "/",
  [
    checkRole(["Admin", "Moderator"]),
    validateRequest(NewsCategoryCreateRequestSchema),
  ],
  createCategory
);
router.put(
  "/:id/update",
  [
    checkRole(["Admin", "Moderator"]),
    validateRequest(NewsCategoryUpdateSchema),
  ],
  updateCategory
);
router.delete("/:id/delete", [checkRole(["Admin"]), deleteCategory]);

export default router;
