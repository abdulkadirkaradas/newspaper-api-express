import { HTTP_STATUS } from "../../core/helper/constants/http-status.constants";
import { ROLE } from "../../core/helper/constants/role.constants";
import { ExtendedRequest } from "../../core/helper/genericTypes";
import { MESSAGES } from "./constants";
import { UserService } from "./user.service";
import { NextFunction, Request, Response } from "express";

export class UserController {
  static async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { filter } = req.body;
      const user = await UserService.getUser(filter);
      return res.status(HTTP_STATUS.OK).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { roleId } = req.body;
      const updatedUser = await UserService.updateRole(id, roleId);
      return res.status(HTTP_STATUS.OK).json({
        userId: updatedUser.id,
        message: MESSAGES.RESPONSE.ROLE_UPDATED,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUserStatus(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { roleId } = req.user || {};
      const { id } = req.params;
      const { blocked, deleted } = req.body;

      if (
        roleId === ROLE.ADMIN ||
        (roleId === ROLE.MODERATOR && blocked !== undefined)
      ) {
        const updateData = {
          blocked,
          ...(roleId === ROLE.ADMIN && { deleted }),
        };
        const updatedUser = await UserService.updateUserStatus(id, updateData);

        return res.status(HTTP_STATUS.OK).json({
          userId: updatedUser?.id,
          message: MESSAGES.RESPONSE.STATUS_UPDATED,
        });
      }

      return res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: MESSAGES.ERROR.INSUFFICIENT_PERMISSION });
    } catch (error) {
      next(error);
    }
  }
}
