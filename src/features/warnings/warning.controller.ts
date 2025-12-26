import { WarningService } from "./warning.service";
import { ExtendedRequest } from "../../core/helper/genericTypes";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../core/helper/constants/http-status.constants";
import { MESSAGES } from "./constants";

export class WarningController {
  static async getAllWarnings(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userRoleId = req.user?.roleId;
      const { filter } = req.body;
      const warnings = await WarningService.getAllWarnings(
        userRoleId ?? 0,
        filter
      );
      res.status(HTTP_STATUS.OK).json(warnings);
    } catch (error) {
      next(error);
    }
  }

  static async getWarnings(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { filter } = req.body;
      const warnings = await WarningService.getWarnings(filter);
      res.status(HTTP_STATUS.OK).json(warnings);
    } catch (error) {
      next(error);
    }
  }

  static async createWarning(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId, content, reason, warningLevel } = req.body;
      const newWarning = await WarningService.createWarning({
        userId,
        content,
        reason,
        warningLevel,
      });
      res.status(HTTP_STATUS.CREATED).json({
        message: MESSAGES.RESPONSE.CREATED,
        newWarning,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editWarning(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { content, reason, warningLevel } = req.body;
      const updatedWarning = await WarningService.editWarning(id, {
        content,
        reason,
        warningLevel,
      });
      res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.RESPONSE.UPDATED,
        updatedWarning,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteWarning(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const deletedWarning = await WarningService.deleteWarning(id);
      res.status(HTTP_STATUS.OK).json({
        message: MESSAGES.RESPONSE.DELETED,
        warningId: deletedWarning.id,
      });
    } catch (error) {
      next(error);
    }
  }
}
