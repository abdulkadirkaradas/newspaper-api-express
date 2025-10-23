import { NextFunction, Request, Response } from "express";
import { LoginService } from "./login.service";
import { ExtendedRequest } from "../../../core/helper/genericTypes";

export class LoginController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await LoginService.login(
        email,
        password
      );

      res.json({ accessToken, refreshToken });
    } catch (err: any) {
      next(err);
    }
  }

  static async user(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const decoded = req.user;
      const user = await LoginService.user(decoded?.id);

      res.json({ message: "Authenticated", user });
    } catch (err: any) {
      next(err);
    }
  }
}
