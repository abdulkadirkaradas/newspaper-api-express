import { z } from "zod";

export const NewsCategoryCreateRequestSchema = z.object({
  name: z.string().max(50),
  description: z.string().max(100),
});

export const NewsCategoryUpdateSchema = z.object({
  name: z.string().max(50).optional(),
  description: z.string().max(100).optional(),
});
