import { Request, Response } from "express";
import { LoginService } from "./login.service";

export class LoginController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { token, user } = await LoginService.login(email, password);
      res.json({ token, user });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async user(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      res.json({ message: "Authenticated", user });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
