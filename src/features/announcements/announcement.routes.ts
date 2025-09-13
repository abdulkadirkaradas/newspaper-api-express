import { Router } from "express";
import {
  getAllAnnouncements,
  createAnnouncement,
} from "./announcement.controller";
import { validateRequest } from "../../core/helper/genericValidation";
import { AnnounceCreateRequestSchema } from "./validationScheme";

const router = Router();

router.get("/", getAllAnnouncements);
router.post(
  "/",
  validateRequest(AnnounceCreateRequestSchema),
  createAnnouncement
);

export default router;
