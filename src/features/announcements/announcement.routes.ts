import { Router } from "express";
import { AnnouncementController } from "./announcement.controller";
import { validateRequest } from "@/core/helper/genericValidation";
import { AnnounceCreateRequestSchema } from "./validationScheme";

const router = Router();

router.get("/", AnnouncementController.getAllAnnouncements);
router.post(
  "/",
  validateRequest(AnnounceCreateRequestSchema),
  AnnouncementController.createAnnouncement
);

export default router;
