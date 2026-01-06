import { checkRole } from "@/core/middleware/checkRole";
import { Router } from "express";
import { validateRequest } from "@/core/helper/genericValidation";
import {
  PostCategoryCreateRequestSchema,
  PostCategoryUpdateSchema,
} from "@repo/shared/features/posts/postCategories/validationScheme";
import { PostCategoryController } from "./post.category.controller";

const router = Router();

router.get(
  "/",
  [checkRole(["Admin", "Moderator"])],
  PostCategoryController.getCategories
);
router.post(
  "/",
  [
    checkRole(["Admin", "Moderator"]),
    validateRequest(PostCategoryCreateRequestSchema),
  ],
  PostCategoryController.createCategory
);
router.put(
  "/:id/update",
  [
    checkRole(["Admin", "Moderator"]),
    validateRequest(PostCategoryUpdateSchema),
  ],
  PostCategoryController.updateCategory
);
router.delete("/:id/delete", [
  checkRole(["Admin"]),
  PostCategoryController.deleteCategory,
]);

export default router;
