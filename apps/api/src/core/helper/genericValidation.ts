import { Request, Response, NextFunction } from "express";
import { z } from "zod";

type ParameterFilter = {
  route?: boolean;
  query?: boolean;
};

export function validateRequest(
  schema: z.ZodObject<any, any>,
  parameterFilter?: ParameterFilter,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = parameterFilter?.route
        ? req.params
        : parameterFilter?.query
          ? req.query
          : req.body;

      schema.parse(value);
      next();
    } catch (error) {
      next(error);
    }
  };
}
