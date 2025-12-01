import { fileUploadMiddleware } from "../../core/middleware/fileUpload";
import { uploadImages } from "./newsImages/news.images.controller";
import { Router } from "express";
import { checkAuthenticate } from "../../core/middleware/jwt/checkAuthenticate";

const router = Router();

/**
 * NewsImage routes
 */
router.post(
  "/:newsId/upload",
  [checkAuthenticate, fileUploadMiddleware("news_images")],
  uploadImages
);

export default router;
