import { Router } from "express";
import { AnnouncementController } from "./announcement.controller";
import { validateRequest } from "@/core/helper/genericValidation";
import {
  AnnounceCreateRequestSchema,
  AnnounceUpdateRequestSchema,
} from "./validationScheme";
import { checkRole } from "@/core/middleware/checkRole";

const router = Router();

router.get("/", AnnouncementController.getAll);
router.post(
  "/",
  [
    validateRequest(AnnounceCreateRequestSchema),
    checkRole(["Admin", "Moderator"]),
  ],
  AnnouncementController.create
);
router.put(
  "/:id/update",
  [
    validateRequest(AnnounceUpdateRequestSchema),
    checkRole(["Admin", "Moderator"]),
  ],
  AnnouncementController.update
);
router.delete(
  "/:id/delete",
  [checkRole(["Admin"])],
  AnnouncementController.delete
);

export default router;
