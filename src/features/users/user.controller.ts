import { ExtendedRequest } from "../../core/helper/genericTypes";
import * as userService from "./user.service";
import { NextFunction, Request, Response } from "express";

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { filter } = req.body;
    const user = await userService.getUser(filter);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function updateRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { roleId } = req.body;
    const updatedUser = await userService.updateRole(id, roleId);
    return res.json({
      userId: updatedUser.id,
      message: "User role updated successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function updateUserStatus(
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
      const updatedUser = await userService.updateUserStatus(id, updateData);

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
