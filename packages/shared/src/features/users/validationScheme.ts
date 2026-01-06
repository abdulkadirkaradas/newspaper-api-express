import { z } from "zod";

export const UserFilterSchema = z.object({
  filter: z
    .object({
      id: z.string().cuid().optional().nullable(),
      email: z.string().email().optional().nullable(),
      username: z.string().optional().nullable(),
    })
    .refine((data) => data.id || data.email || data.username, {
      message: "At least one of id, email, or username is required",
    }),
});
