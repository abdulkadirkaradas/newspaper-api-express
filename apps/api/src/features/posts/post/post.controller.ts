import { PostService } from "./post.service";
import { NextFunction, Request, Response } from "express";
import { ExtendedRequest } from "@/core/helper/genericTypes";
import { HTTP_STATUS } from "@/core/helper/constants/http-status.constants";
import { MESSAGES } from "./constants";

export class PostController {
  static async postFlow(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const posts = await PostService.postFlow();
      res.status(HTTP_STATUS.OK).json(posts);
    } catch (error) {
      next(error);
    }
  }
  static async getPost(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { filter } = req.body;
      const userRoleId = req.user?.roleId;
      const post = await PostService.getPost(userRoleId, filter);
      res.status(HTTP_STATUS.OK).json(post);
    } catch (error) {
      next(error);
    }
  }

  static async createPost(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = { ...req.body, authorId: req.user.id };
      const createdPost = await PostService.create(data);
      res.status(HTTP_STATUS.CREATED).json({
        message: MESSAGES.RESPONSE.CREATED,
        createdPost,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePost(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { postId } = req.params;
      const data = req.body;
      const roleId = req.user.roleId;
      const updatedPost = await PostService.update(roleId, postId, data);
      res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.RESPONSE.UPDATED,
        updatedPost,
      });
    } catch (error) {
      next(error);
    }
  }

  static async votePost(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { postId } = req.params;
      const { value } = req.body;
      const authorId = req.user.id;
      const votedPost = await PostService.handleVote({
        postId,
        authorId,
        value: Number(value) as 1 | -1,
      });
      res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.RESPONSE.VOTED,
        votedPost,
      });
    } catch (error) {
      next(error);
    }
  }

  static async changePostStatus(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const authorId = req.user?.id;
      const { postId } = req.params;
      const { filter } = req.body;
      const updatedPost = await PostService.changeStatus(
        authorId,
        postId,
        filter,
      );
      res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.RESPONSE.STATUS_CHANGED,
        post: updatedPost,
      });
    } catch (error) {
      next(error);
    }
  }

  static async approvePost(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const authorId = req.user?.id;
      const { postId } = req.params;
      const approvedPost = await PostService.approve(authorId, postId);
      res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.RESPONSE.APPROVED,
        post: approvedPost,
      });
    } catch (error: any) {
      if (error.message === MESSAGES.ERROR.POST_ALREADY_APPROVED) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: error.message,
        });
        return;
      }
      next(error);
    }
  }
}
