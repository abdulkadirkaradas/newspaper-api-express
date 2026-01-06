import { Router } from "express";
import { BadgeController } from "./badge.controller";
import { validateRequest } from "@/core/helper/genericValidation";
import {
  BadgeCreateRequestSchema,
  BadgeUpdateRequestSchema,
} from "@repo/shared/features/badges/validationScheme";
import { checkRole } from "@/core/middleware/checkRole";

const router = Router();

router.get("/", BadgeController.get);
router.post(
  "/",
  [
    checkRole(["Admin", "Moderator"]),
    validateRequest(BadgeCreateRequestSchema),
  ],
  BadgeController.create
);
router.put(
  "/:id/update",
  [
    checkRole(["Admin", "Moderator"]),
    validateRequest(BadgeUpdateRequestSchema),
  ],
  BadgeController.update
);
router.delete("/:id/delete", [checkRole(["Admin"])], BadgeController.delete);

export default router;
