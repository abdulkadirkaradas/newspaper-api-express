import { ExtendedRequest } from "../../core/helper/genericTypes";
import { UserService } from "./user.service";
import { NextFunction, Request, Response } from "express";

export class UserController {
  static async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { filter } = req.body;
      const user = await UserService.getUser(filter);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { roleId } = req.body;
      const updatedUser = await UserService.updateRole(id, roleId);
      return res.json({
        userId: updatedUser.id,
        message: "User role updated successfully",
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

      if (roleId === 1 || (roleId === 2 && blocked !== undefined)) {
        const updateData = { blocked, ...(roleId === 1 && { deleted }) };
        const updatedUser = await UserService.updateUserStatus(id, updateData);

        return res.json({
          userId: updatedUser?.id,
          message: `User status updated successfully`,
        });
      }

      return res.status(403).json({ message: "Insufficient permissions" });
    } catch (error) {
      next(error);
    }
  }
}
