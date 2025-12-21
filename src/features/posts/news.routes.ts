import { fileUploadMiddleware } from "../../core/middleware/fileUpload";
import { NewsImageController } from "./newsImages/news.images.controller";
import { NewsController } from "./news/news.controller";
import { Router } from "express";
import { checkAuthenticate } from "../../core/middleware/jwt/checkAuthenticate";
import {
  NewsCreateRequestSchema,
  NewsStatusUpdateRequestSchema,
  NewsUpdateRequestSchema,
  NewsVoteRequestSchema,
} from "./news/validationScheme";
import { validateRequest } from "../../core/helper/genericValidation";
import { checkRole } from "../../core/middleware/checkRole";

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
router.post(
  "/:newsId/vote",
  [checkRole(["Writer"]), validateRequest(NewsVoteRequestSchema)],
  NewsController.voteNews
);
router.patch(
  "/:newsId/change-status",
  [validateRequest(NewsStatusUpdateRequestSchema)],
  NewsController.changeNewsStatus
);
router.patch(
  "/:newsId/approve",
  [checkRole(["Admin", "Moderator"])],
  NewsController.approveNews
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
