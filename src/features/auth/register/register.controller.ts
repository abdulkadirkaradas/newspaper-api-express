import e, { Request, Response } from "express";
import { RegisterService } from "./register.service";

export class RegisterController {
  static async register(req: Request, res: Response) {
    try {
      const { name, lastname, username, email, password } = req.body;
      const user = await RegisterService.register({
        name,
        lastname,
        username,
        email,
        password,
      });
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
