import { NextFunction, Request, Response } from "express";
import { LoginService } from "./login.service";
import { ExtendedRequest } from "../../../core/helper/genericTypes";
import { HTTP_STATUS } from "../../../core/helper/constants/http-status.constants";

export class LoginController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await LoginService.login(
        email,
        password
      );

      res.status(HTTP_STATUS.OK).json({ accessToken, refreshToken });
    } catch (err: any) {
      next(err);
    }
  }

  static async user(req: ExtendedRequest, res: Response, next: NextFunction) {
    try {
      const decoded = req.user;
      const user = await LoginService.user(decoded?.id);

      res.status(HTTP_STATUS.OK).json({ message: "Authenticated", user });
    } catch (err: any) {
      next(err);
    }
  }
}
