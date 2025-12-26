import { Response, NextFunction } from "express";
import { prisma } from "../config/database";
import { verifyRole } from "../helper/userRoles";
import { ExtendedRequest } from "../helper/genericTypes";
import { HTTP_STATUS } from "../helper/constants/http-status.constants";
import { ROLE } from "../helper/constants/role.constants";

export const checkRole = (role: string[]) => {
  return async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const loggedUser = req.user;

    const userRole = await prisma.user.findFirst({
      where: { id: loggedUser?.id },
      select: { roleId: true },
    });

    if (!verifyRole(userRole?.roleId ?? ROLE.UNAUTHORIZED, role)) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        title: "Unauthorized Request",
        message: "Current user are not granted for this operation",
      });
    }

    next();
  };
};
