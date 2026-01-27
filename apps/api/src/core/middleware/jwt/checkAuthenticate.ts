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

export const checkAuthenticate = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const header: string = req.headers["authorization"] || "";
    const token: string = header && header.split(" ")[1];

    if (!token) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: MIDDLEWARE_ERRORS.AUTH.UNAUTHORIZED_ACTION });
    }

    const decoded = jwt.verify(token, JWT_SECRET_ACCESS) as UserPayload;
    
    if (decoded && decoded.userId) {
       // Attach user to request
       // We can fetch full user details here if needed, or just attach the ID
       // The previous implementation fetched user info, let's keep that behavior if possible,
       // but strictly speaking invalid token should just 401.
       
       // Optimization: Maybe don't fetch DB on every request if not needed?
       // But the previous one did: checkAuthenticate => getUserInformation(loggedUser.userId)
       // Let's keep it to ensure consistency.
       req.user = await getUserInformation(decoded.userId);
       next();
    } else {
        throw new Error("Invalid token payload");
    }

  } catch (error) {
    return res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: MIDDLEWARE_ERRORS.AUTH.UNAUTHORIZED_ACTION });
  }
};

