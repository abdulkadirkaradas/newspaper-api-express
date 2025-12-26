import { Request, Response, NextFunction } from "express";
import { Prisma } from "../../generated/prisma";
import { ZodError } from "zod";
import { MulterError } from "multer";
import { HTTP_STATUS } from "../helper/constants/http-status.constants";
import { $ZodIssue } from "zod/v4/core";

function handlePrismaError(error: any) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return {
          statusCode: HTTP_STATUS.BAD_REQUEST,
          message: "Duplicate value error, unique constraint violated",
        };
      case "P2003":
        return {
          statusCode: HTTP_STATUS.BAD_REQUEST,
          message: "Foreign key constraint violation",
        };
      case "P2025":
        return { statusCode: HTTP_STATUS.NOT_FOUND, message: "Record not found" };
      default:
        return { statusCode: HTTP_STATUS.BAD_REQUEST, message: "Prisma request error" };
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
      message: "Validation error",
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

  return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ message: "Internal server error", details: err.message });
};

export default errorHandler;
