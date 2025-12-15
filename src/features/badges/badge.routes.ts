import { Router } from "express";
import { BadgeController } from "./badge.controller";
import { validateRequest } from "../../core/helper/genericValidation";
import { BadgeCreateRequestSchema } from "./validationScheme";
import { checkRole } from "../../core/middleware/checkRole";

const router = Router();

router.get("/", BadgeController.getBadges);
router.post(
  "/",
  [checkRole(["Admin"]), validateRequest(BadgeCreateRequestSchema)],
  BadgeController.createBadges
);

export default router;
