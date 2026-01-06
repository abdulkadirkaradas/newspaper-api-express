import { z } from "zod";

export const PostCreateRequestSchema = z
  .object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters long")
      .max(100, "Title must be at most 100 characters long"),
    content: z
      .string()
      .min(100, "Content must be at least 100 characters long")
      .max(5000, "Content must be at most 5000 characters long"),
    opposedToId: z.string().cuid().optional(),
    categoryId: z.string().cuid().optional(),
  })
  .refine((data) => !(data.opposedToId && data.categoryId), {
    message: "You can't send both opposedToId and categoryId at the same time.",
    path: ["opposedToId", "categoryId"],
  })
  .refine((data) => data.opposedToId || data.categoryId, {
    message:
      "You must send either opposedToId or categoryId to perform this action.",
    path: ["opposedToId", "categoryId"],
  });

export const PostUpdateRequestSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be at most 100 characters long")
    .optional()
    .nullable(),
  content: z
    .string()
    .min(100, "Content must be at least 100 characters long")
    .max(5000, "Content must be at most 5000 characters long")
    .optional()
    .nullable(),
  categoryId: z.string().cuid("Incorrect category ID").optional().nullable(),
});

export const PostStatusUpdateRequestSchema = z.object({
  pinned: z.boolean().optional().nullable(),
  visibility: z.boolean().optional().nullable(),
  deleted: z.boolean().optional().nullable(),
});

export const PostVoteRequestSchema = z.object({
  value: z.coerce
    .number({ errorMap: () => ({ message: "Please enter a number" }) })
    .pipe(
      z.union([z.literal(1), z.literal(-1)], {
        errorMap: () => ({ message: "Please enter 1 or -1" }),
      })
    ),
});
