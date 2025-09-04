import { z } from "zod";

export const loginRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(100),
});
