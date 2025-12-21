import { PostService } from "./post.service";
import { NextFunction, Request, Response } from "express";
import { ExtendedRequest } from "../../../core/helper/genericTypes";

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
      res.json(post);
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
      const data = { ...req.body, userId: req.user.id };
      const post = await PostService.create(data);
      res.json(post);
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
      const post = await PostService.update(roleId, postId, data);
      res.json(post);
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
      const userId = req.user.id;
      const post = await PostService.handleVote({
        postId,
        userId,
        value: Number(value) as 1 | -1,
      });
      res.json(post);
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
      const userId = req.user?.id;
      const { postId } = req.params;
      const { filter } = req.body;
      const post = await PostService.changeStatus(userId, postId, filter);
      res.json({
        message: "Post status updated successfully",
        post: post,
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
      const userId = req.user?.id;
      const { postId } = req.params;
      const post = await PostService.approve(userId, postId);
      res.json({
        message: "Post approved successfully",
        post: post,
      });
    } catch (error: any) {
      if (error.message === "Post is already approved!") {
        res.status(400).json({
          message: error.message,
        });
        return;
      }
      next(error);
    }
  }
}
