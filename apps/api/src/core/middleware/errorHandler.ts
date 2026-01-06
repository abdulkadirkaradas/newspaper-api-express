import { Request, Response, NextFunction } from "express";
import { Prisma } from "@/generated/prisma";
import { ZodError } from "zod";
import { MulterError } from "multer";
import { HTTP_STATUS } from "@/core/helper/constants/http-status.constants";
import { $ZodIssue } from "zod/v4/core";
import { ERROR_HANDLER } from "@/core/helper/constants/errors.constants";

function handlePrismaError(error: any) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case ERROR_HANDLER.PRISMA_ERROR.P2002.code:
        return {
          statusCode: HTTP_STATUS.BAD_REQUEST,
          message: ERROR_HANDLER.PRISMA_ERROR.P2002.message,
        };
      case ERROR_HANDLER.PRISMA_ERROR.P2003.code:
        return {
          statusCode: HTTP_STATUS.BAD_REQUEST,
          message: ERROR_HANDLER.PRISMA_ERROR.P2003.message,
        };
      case ERROR_HANDLER.PRISMA_ERROR.P2025.code:
        return {
          statusCode: HTTP_STATUS.NOT_FOUND,
          message: ERROR_HANDLER.PRISMA_ERROR.P2025.message,
        };
      default:
        return {
          statusCode: HTTP_STATUS.BAD_REQUEST,
          message: ERROR_HANDLER.PRISMA_ERROR.DEFAULT_ERROR_MESSAGE,
        };
    }
  }
  return null;
}

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const prismaError = handlePrismaError(err);
  if (prismaError) {
    return res
      .status(prismaError.statusCode)
      .json({ message: prismaError.message });
  }

  if (err instanceof ZodError) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: ERROR_HANDLER.ZOD_ERROR.validationError,
      errors: err.issues.map((issue: $ZodIssue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (err instanceof MulterError) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      code: err.code,
      message: err.message,
      field: err.field,
    });
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: ERROR_HANDLER.INTERNAL_SERVER_ERROR,
    details: err.message,
  });
};

export default errorHandler;
