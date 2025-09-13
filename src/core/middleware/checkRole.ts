import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/database";
import { verifyRole } from "../helper/userRoles";

interface ExtendedRequest extends Request {
  user?: any;
}

export const checkRole = (role: string[]) => {
  return async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const loggedUser = req.user;

    const userRole = await prisma.user.findFirst({
      where: { id: loggedUser?.id },
      select: { roleId: true },
    });

    if (!verifyRole(userRole?.roleId ?? 0, role)) {
      res.status(401).json({
        title: "Unauthorized Request",
        message: "Current user are not granted for this operation",
      });
    }

    next();
  };
};
