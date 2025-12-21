import { Request, Response, NextFunction } from "express";
import { Prisma } from "../../generated/prisma";
import { ZodError } from "zod";
import { MulterError } from "multer";
import { $ZodIssue } from "zod/v4/core";

function handlePrismaError(error: any) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return {
          statusCode: 400,
          message: "Duplicate value error, unique constraint violated",
        };
      case "P2003":
        return { statusCode: 400, message: "Foreign key constraint violation" };
      case "P2025":
        return { statusCode: 404, message: "Record not found" };
      default:
        return { statusCode: 400, message: "Prisma request error" };
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
    return res.status(400).json({
      message: "Validation error",
      errors: err.issues.map((issue: $ZodIssue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (err instanceof MulterError) {
    return res.status(400).json({
      code: err.code,
      message: err.message,
      field: err.field,
    });
  }

  return res
    .status(500)
    .json({ message: "Internal server error", details: err.message });
};

export default errorHandler;
