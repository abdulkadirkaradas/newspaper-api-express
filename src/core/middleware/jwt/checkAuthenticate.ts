import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface ExtendedRequest extends Request {
  user?: any;
}

const JWT_SECRET_TOKEN: string = process.env.JWT_SECRET ?? "";

export const checkAuthenticate = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const header: string = req.headers["authorization"] || "";
  const token: string = header && header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized Action" });
  }

  jwt.verify(token, JWT_SECRET_TOKEN, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Forbidden Action" });
    }
    req.user = user;
    next();
  });
};
