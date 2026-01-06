import { z } from "zod";

export const registerRequestSchema = z.object({
  name: z.string().min(2).max(100),
  lastname: z.string().min(2).max(100),
  username: z.string().min(8).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});
