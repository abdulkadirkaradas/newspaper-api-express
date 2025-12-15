import { fileUploadMiddleware } from "../../core/middleware/fileUpload";
import { uploadImages } from "./newsImages/news.images.controller";
import {
  getNews,
  createNews,
  updateNews,
  changeNewsStatus,
} from "./news/news.controller";
import { Router } from "express";
import { checkAuthenticate } from "../../core/middleware/jwt/checkAuthenticate";
import {
  NewsCreateRequestSchema,
  NewsStatusUpdateRequestSchema,
  NewsUpdateRequestSchema,
} from "./news/validationScheme";
import { validateRequest } from "../../core/helper/genericValidation";

const router = Router();

/**
 * Common News Routes
 */
router.get("/", getNews);
router.post(
  "/:userId/create",
  [validateRequest(NewsCreateRequestSchema)],
  createNews
);
router.put(
  "/:newsId/update",
  [validateRequest(NewsUpdateRequestSchema)],
  updateNews
);
router.put(
  "/:newsId/change-status",
  [validateRequest(NewsStatusUpdateRequestSchema)],
  changeNewsStatus
);

/**
 * NewsImage routes
 */
router.post(
  "/:newsId/upload",
  [checkAuthenticate, fileUploadMiddleware("news_images")],
  uploadImages
);

export default router;
