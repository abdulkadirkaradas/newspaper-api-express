import { fileUploadMiddleware } from "../../core/middleware/fileUpload";
import { PostImageController } from "./postImages/post.images.controller";
import { PostController } from "./post/post.controller";
import { Router } from "express";
import { checkAuthenticate } from "../../core/middleware/jwt/checkAuthenticate";
import {
  PostCreateRequestSchema,
  PostStatusUpdateRequestSchema,
  PostUpdateRequestSchema,
  PostVoteRequestSchema,
} from "./post/validationScheme";
import { validateRequest } from "../../core/helper/genericValidation";
import { checkRole } from "../../core/middleware/checkRole";

const router = Router();

/**
 * Common Post Routes
 */
router.get("/", PostController.getPost);
router.post(
  "/:userId/create",
  [validateRequest(PostCreateRequestSchema)],
  PostController.createPost
);
router.put(
  "/:postId/update",
  [validateRequest(PostUpdateRequestSchema)],
  PostController.updatePost
);
router.post(
  "/:postId/vote",
  [checkRole(["Writer"]), validateRequest(PostVoteRequestSchema)],
  PostController.votePost
);
router.patch(
  "/:postId/change-status",
  [validateRequest(PostStatusUpdateRequestSchema)],
  PostController.changePostStatus
);
router.patch(
  "/:postId/approve",
  [checkRole(["Admin", "Moderator"])],
  PostController.approvePost
);

/**
 * PostImage routes
 */
router.post(
  "/:postId/upload",
  [checkAuthenticate, fileUploadMiddleware("post_images")],
  PostImageController.uploadImages
);

export default router;
