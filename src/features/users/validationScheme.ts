import { z } from "zod";

export const UserFilterSchema = z.object({
  filter: z
    .object({
      id: z.string().nullable().optional(),
      email: z.string().nullable().optional(),
      username: z.string().nullable().optional(),
    })
    .refine((data) => data.id || data.email || data.username, {
      message: "At least one of id, email, or username is required",
    }),
});
