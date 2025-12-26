import { PostService } from "./post.service";
import { NextFunction, Request, Response } from "express";
import { ExtendedRequest } from "../../../core/helper/genericTypes";
import { HTTP_STATUS } from "../../../core/helper/constants/http-status.constants";

export class PostController {
  static async getPost(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
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
    next: NextFunction
  ) {
    try {
      const data = { ...req.body, authorId: req.user.id };
      const createdPost = await PostService.create(data);
      res.status(HTTP_STATUS.CREATED).json(createdPost);
    } catch (error) {
      next(error);
    }
  }

  static async updatePost(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { postId } = req.params;
      const data = req.body;
      const roleId = req.user.roleId;
      const updatedPost = await PostService.update(roleId, postId, data);
      res.status(HTTP_STATUS.OK).json(updatedPost);
    } catch (error) {
      next(error);
    }
  }

  static async votePost(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
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
      res.status(HTTP_STATUS.OK).json(votedPost);
    } catch (error) {
      next(error);
    }
  }

  static async changePostStatus(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const authorId = req.user?.id;
      const { postId } = req.params;
      const { filter } = req.body;
      const updatedPost = await PostService.changeStatus(
        authorId,
        postId,
        filter
      );
      res.status(HTTP_STATUS.OK).json({
        message: "Post status updated successfully",
        post: updatedPost,
      });
    } catch (error) {
      next(error);
    }
  }

  static async approvePost(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const authorId = req.user?.id;
      const { postId } = req.params;
      const approvedPost = await PostService.approve(authorId, postId);
      res.status(HTTP_STATUS.OK).json({
        message: "Post approved successfully",
        post: approvedPost,
      });
    } catch (error: any) {
      if (error.message === "Post is already approved!") {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: error.message,
        });
        return;
      }
      next(error);
    }
  }
}
