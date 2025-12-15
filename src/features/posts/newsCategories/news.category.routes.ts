import { checkRole } from "../../../core/middleware/checkRole";
import { Router } from "express";
import { validateRequest } from "../../../core/helper/genericValidation";
import {
  NewsCategoryCreateRequestSchema,
  NewsCategoryUpdateSchema,
} from "./validationScheme";
import { NewsCategoryController } from "./news.category.controller";

const router = Router();

router.get(
  "/",
  [checkRole(["Admin", "Moderator"])],
  NewsCategoryController.getCategories
);
router.post(
  "/",
  [
    checkRole(["Admin", "Moderator"]),
    validateRequest(NewsCategoryCreateRequestSchema),
  ],
  NewsCategoryController.createCategory
);
router.put(
  "/:id/update",
  [
    checkRole(["Admin", "Moderator"]),
    validateRequest(NewsCategoryUpdateSchema),
  ],
  NewsCategoryController.updateCategory
);
router.delete("/:id/delete", [
  checkRole(["Admin"]),
  NewsCategoryController.deleteCategory,
]);

export default router;
