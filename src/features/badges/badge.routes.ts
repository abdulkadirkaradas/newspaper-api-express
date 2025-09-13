import { Router } from "express";
import { getBadges, createBadges } from "./badge.controller";
import { validateRequest } from "../../core/helper/genericValidation";
import { BadgeCreateRequestSchema } from "./validationScheme";
import { checkRole } from "../../core/middleware/checkRole";

const router = Router();

router.get("/", getBadges);
router.post(
  "/",
  [checkRole(["Admin"]), validateRequest(BadgeCreateRequestSchema)],
  createBadges
);

export default router;
