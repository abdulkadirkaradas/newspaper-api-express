import { Router } from "express";
import { UserController } from "./user.controller";
import { checkRole } from "@/core/middleware/checkRole";
import { UserFilterSchema } from "@repo/shared/features/users/validationScheme";
import { validateRequest } from "@/core/helper/genericValidation";

const router = Router();

router.get("/", [validateRequest(UserFilterSchema)], UserController.getUser);
router.put(
  "/:id/update-role",
  [checkRole(["Admin"])],
  UserController.updateRole
);
router.put(
  "/:id/update-status",
  [checkRole(["Admin", "Moderator"])],
  UserController.updateUserStatus
);

export default router;
