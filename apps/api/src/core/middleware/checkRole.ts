import { Response, NextFunction } from "express";
import { prisma } from "@/core/config/database";
import { verifyRole } from "@/core/helper/userRoles";
import { ExtendedRequest } from "@/core/helper/genericTypes";
import { HTTP_STATUS } from "@/core/helper/constants/http-status.constants";
import { ROLE } from "@/core/helper/constants/role.constants";
import { MIDDLEWARE_ERRORS } from "@/core/helper/constants/errors.constants";

export const checkRole = (role: string[]) => {
  return async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const loggedUser = req.user;

    const userRole = await prisma.user.findFirst({
      where: { id: loggedUser?.id },
      select: { roleId: true },
    });

    if (!verifyRole(userRole?.roleId ?? ROLE.UNAUTHORIZED, role)) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        title: MIDDLEWARE_ERRORS.ROLE.UNAUTHORIZED_REQUEST,
        message: MIDDLEWARE_ERRORS.ROLE.USER_NOT_AUTHORIZED,
      });
    }

    next();
  };
};
