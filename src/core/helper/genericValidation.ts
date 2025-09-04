import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export function validateRequest(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: error,
        });
      }
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };
}
