import * as warningService from "./warning.service";
import { ExtendedRequest } from "../../core/helper/genericTypes";
import { NextFunction, Request, Response } from "express";

export async function getAllWarnings(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userRoleId = req.user?.roleId;
    const { filter } = req.body;
    const warnings = await warningService.getAllWarnings(
      userRoleId ?? 0,
      filter
    );
    res.json(warnings);
  } catch (error) {
    next(error);
  }
}

export async function getWarnings(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { filter } = req.body;
    const warnings = await warningService.getWarnings(filter);
    res.json(warnings);
  } catch (error) {
    next(error);
  }
}

export async function createWarning(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, content, reason, warningLevel } = req.body;
    const newWarning = await warningService.createWarning({
      userId,
      content,
      reason,
      warningLevel,
    });
    res.status(201).json(newWarning);
  } catch (error) {
    next(error);
  }
}

export async function editWarning(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { content, reason, warningLevel } = req.body;
    const updatedWarning = await warningService.editWarning(id, {
      content,
      reason,
      warningLevel,
    });
    res.json(updatedWarning);
  } catch (error) {
    next(error);
  }
}

export async function deleteWarning(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const deletedWarning = await warningService.deleteWarning(id);
    res.json({
      warningId: deletedWarning.id,
      message: "Warning deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
}
