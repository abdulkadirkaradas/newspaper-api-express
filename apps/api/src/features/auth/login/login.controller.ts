import jwt from "jsonwebtoken";
import { ExtendedRequest } from "@/core/helper/genericTypes";
import { HTTP_STATUS } from "@/core/helper/constants/http-status.constants";
import { LoginService } from "./login.service";
import { MESSAGES } from "../constants";
import { NextFunction, Request, Response } from "express";
import { redisService } from "@/core/services/redis.service";
import {
  generateAccessToken,
  verifyRefreshToken,
} from "@/core/helper/jwt/generateTokens";

export class LoginController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, user } = await LoginService.login(
        email,
        password,
      );

      // Store refresh token in Redis (7 days TTL)
      await redisService.set(
        `refresh_token:${user.id}:${refreshToken}`,
        "1",
        7 * 24 * 60 * 60,
      );

      // Set HttpOnly cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(HTTP_STATUS.OK).json({ accessToken, user });
    } catch (err: any) {
      next(err);
    }
  }

  static async user(req: ExtendedRequest, res: Response, next: NextFunction) {
    try {
      const decoded = req.user;
      const user = await LoginService.user(decoded?.id);

      res.status(HTTP_STATUS.OK).json(user);
    } catch (err: any) {
      next(err);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (refreshToken) {
        const decoded = jwt.decode(refreshToken) as { userId: string } | null;
        if (decoded && decoded.userId) {
          await redisService.del(
            `refresh_token:${decoded.userId}:${refreshToken}`,
          );
        }
      }

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(HTTP_STATUS.OK).json({ message: "Logged out successfully" });
    } catch (err: any) {
      next(err);
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new Error(MESSAGES.ERROR.INVALID_TOKEN);
      }

      const decoded = verifyRefreshToken(refreshToken);
      if (!decoded) {
        throw new Error(MESSAGES.ERROR.INVALID_TOKEN);
      }

      const storedToken = await redisService.get(
        `refresh_token:${decoded.id}:${refreshToken}`,
      );
      if (!storedToken) {
        throw new Error(MESSAGES.ERROR.INVALID_TOKEN);
      }

      const accessToken = generateAccessToken({ id: decoded.id });

      res.status(HTTP_STATUS.OK).json({ accessToken });
    } catch (err: any) {
      // If refresh fails, we should clear the cookie so client stops trying
      res.clearCookie("refreshToken");
      next(err);
    }
  }
}
