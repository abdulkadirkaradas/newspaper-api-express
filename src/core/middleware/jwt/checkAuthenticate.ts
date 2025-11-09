import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ExtendedRequest } from "../../helper/genericTypes";
import { getUserInformation } from "../../config/database";

const JWT_SECRET_ACCESS: string = process.env.JWT_SECRET_ACCESS ?? "";
const JWT_SECRET_REFRESH: string = process.env.JWT_SECRET_REFRESH ?? "";

type UserPayload = {
  userId: string;
};

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

  jwt.verify(token, JWT_SECRET_ACCESS, async (error, user) => {
    if (error) {
      const refreshToken = getTokenFromRequest(req);

      if (!refreshToken) {
        return res.status(403).json({
          message: "Please provide the refresh token to renew the access token",
        });
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

    const loggedUser = (user as UserPayload);
    if (loggedUser && loggedUser.userId) {
      if (
        loggedUser.userId &&
        req.user?.id !== loggedUser.userId
      ) {
        req.user = await getUserInformation(loggedUser.userId);
      }
    }

    next();
  });
};

function getTokenFromRequest(request: ExtendedRequest): string {
  const bodyToken = request.body?.refreshToken;
  const queryToken = request.query?.refreshToken;
  const header = request.headers["x-refresh-token"];
  const headerToken = Array.isArray(header) ? header[0] : header;

  return (bodyToken ?? queryToken ?? headerToken ?? null) as string;
}
