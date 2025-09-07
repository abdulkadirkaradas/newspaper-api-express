import { NextFunction, Request, Response } from "express";
import { LoginService } from "./login.service";

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

  static async user(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      res.json({ message: "Authenticated", user });
    } catch (err: any) {
      next(err);
    }
  }
}
