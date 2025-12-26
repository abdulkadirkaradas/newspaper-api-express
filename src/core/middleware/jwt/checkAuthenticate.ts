import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ExtendedRequest } from "../../helper/genericTypes";
import { getUserInformation } from "../../config/database";
import { generateAccessToken } from "../../helper/jwt/generateTokens";
import { HTTP_STATUS } from "../../helper/constants/http-status.constants";

const JWT_SECRET_ACCESS: string = process.env.JWT_SECRET_ACCESS ?? "";
const JWT_SECRET_REFRESH: string = process.env.JWT_SECRET_REFRESH ?? "";

type UserPayload = JwtPayload & {
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
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Unauthorized Action" });
  }

  jwt.verify(token, JWT_SECRET_ACCESS, async (error: any, user: any) => {
    if (error) {
      const refreshToken = getTokenFromRequest(req);

      if (!refreshToken) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({
          message: "Please provide the refresh token to renew the access token",
        });
      }

      jwt.verify(
        refreshToken,
        JWT_SECRET_REFRESH,
        (refreshError: any, refreshUser: any) => {
          if (refreshError) {
            return res
              .status(HTTP_STATUS.FORBIDDEN)
              .json({ message: "Invalid or expired refresh token" });
          }

          const newAccessToken = generateAccessToken({
            id: refreshUser?.userId,
          });

          return res.status(HTTP_STATUS.OK).json({ accessToken: newAccessToken });
        }
      );
    }

    const loggedUser = user as UserPayload;
    if (loggedUser && loggedUser.userId) {
      if (loggedUser.userId && req.user?.id !== loggedUser.userId) {
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
