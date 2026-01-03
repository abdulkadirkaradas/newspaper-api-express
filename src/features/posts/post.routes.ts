import { fileUploadMiddleware } from "@/core/middleware/fileUpload";
import { PostImageController } from "./postImages/post.images.controller";
import { PostController } from "./post/post.controller";
import { Router } from "express";
import { checkAuthenticate } from "@/core/middleware/jwt/checkAuthenticate";
import {
  PostCreateRequestSchema,
  PostStatusUpdateRequestSchema,
  PostUpdateRequestSchema,
  PostVoteRequestSchema,
} from "./post/validationScheme";
import { validateRequest } from "@/core/helper/genericValidation";
import { checkRole } from "@/core/middleware/checkRole";
import {
  PostImageDeleteRequestSchema,
  PostImageFilterSchema,
  PostImageUploadRequestSchema,
} from "./postImages/validationSchema";

const router = Router();

/**
 * Common Post Routes
 */
router.get("/", PostController.getPost);
router.post(
  "/",
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
router.get(
  "/image",
  [checkAuthenticate, validateRequest(PostImageFilterSchema)],
  PostImageController.get
);
router.post(
  "/image/:postId",
  [
    checkAuthenticate,
    fileUploadMiddleware("post_images"),
    validateRequest(PostImageUploadRequestSchema),
  ],
  PostImageController.upload
);
router.delete(
  "/image",
  [checkAuthenticate, validateRequest(PostImageDeleteRequestSchema)],
  PostImageController.delete
);

export default router;
