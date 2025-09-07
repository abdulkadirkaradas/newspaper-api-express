import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ref } from "process";

interface ExtendedRequest extends Request {
  user?: any;
}

const JWT_SECRET_ACCESS: string = process.env.JWT_SECRET_ACCESS ?? "";
const JWT_SECRET_REFRESH: string = process.env.JWT_SECRET_REFRESH ?? "";

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

  jwt.verify(token, JWT_SECRET_ACCESS, (error, user) => {
    if (error) {
      const refreshToken =
        req.body.refreshToken ||
        req.query.refreshToken ||
        req.headers["x-refresh-token"];

      if (!refreshToken) {
        return res.status(403).json({ message: "Refresh token is missing" });
      }

      jwt.verify(
        refreshToken,
        JWT_SECRET_REFRESH,
        (refreshError: any, refreshUser: any) => {
          if (refreshError) {
            return res
              .status(403)
              .json({ message: "Invalid or expired refresh token" });
          }

          const user = { id: refreshUser?.id };
          const newAccessToken = jwt.sign(user, JWT_SECRET_ACCESS, {
            expiresIn: "15m",
          });

          return res.json({ accessToken: newAccessToken });
        }
      );
    }

    req.user = user;
    next();
  });
};
