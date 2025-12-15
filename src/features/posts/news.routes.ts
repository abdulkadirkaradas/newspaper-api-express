import { fileUploadMiddleware } from "../../core/middleware/fileUpload";
import { NewsImageController } from "./newsImages/news.images.controller";
import { NewsController } from "./news/news.controller";
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
router.get("/", NewsController.getNews);
router.post(
  "/:userId/create",
  [validateRequest(NewsCreateRequestSchema)],
  NewsController.createNews
);
router.put(
  "/:newsId/update",
  [validateRequest(NewsUpdateRequestSchema)],
  NewsController.updateNews
);
router.put(
  "/:newsId/change-status",
  [validateRequest(NewsStatusUpdateRequestSchema)],
  NewsController.changeNewsStatus
);

/**
 * NewsImage routes
 */
router.post(
  "/:newsId/upload",
  [checkAuthenticate, fileUploadMiddleware("news_images")],
  NewsImageController.uploadImages
);

export default router;
