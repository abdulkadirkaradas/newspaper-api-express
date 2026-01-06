import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ExtendedRequest } from "@/core/helper/genericTypes";
import { getUserInformation } from "@/core/config/database";
import { generateAccessToken } from "@/core/helper/jwt/generateTokens";
import { HTTP_STATUS } from "@/core/helper/constants/http-status.constants";
import { MIDDLEWARE_ERRORS } from "@/core/helper/constants/errors.constants";

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
    return res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: MIDDLEWARE_ERRORS.AUTH.UNAUTHORIZED_ACTION });
  }

  jwt.verify(token, JWT_SECRET_ACCESS, async (error: any, user: any) => {
    if (error) {
      const refreshToken = getTokenFromRequest(req);

      if (!refreshToken) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({
          message: MIDDLEWARE_ERRORS.AUTH.RENEW_REFRESH_TOKEN,
        });
      }

      jwt.verify(
        refreshToken,
        JWT_SECRET_REFRESH,
        (refreshError: any, refreshUser: any) => {
          if (refreshError) {
            return res
              .status(HTTP_STATUS.FORBIDDEN)
              .json({ message: MIDDLEWARE_ERRORS.AUTH.INVALID_REFRESH_TOKEN });
          }

          const newAccessToken = generateAccessToken({
            id: refreshUser?.userId,
          });

          return res
            .status(HTTP_STATUS.OK)
            .json({ accessToken: newAccessToken });
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
