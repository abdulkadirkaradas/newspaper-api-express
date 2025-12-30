import { NextFunction, Request, Response } from "express";
import { RegisterService } from "./register.service";
import { HTTP_STATUS } from "@/core/helper/constants/http-status.constants";

export class RegisterController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, lastname, username, email, password } = req.body;
      const user = await RegisterService.register({
        name,
        lastname,
        username,
        email,
        password,
      });
      res.status(HTTP_STATUS.CREATED).json(user);
    } catch (error: any) {
      next(error);
    }
  }
}
