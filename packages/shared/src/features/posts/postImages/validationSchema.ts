import { z } from "zod";

export const PostImageUploadRequestSchema = z.object({
  postId: z.string().cuid(),
});

export const PostImageFilterSchema = z
  .object({
    filter: z.object({
      id: z.string().cuid().optional().nullable(),
      postId: z.string().cuid().optional().nullable(),
    }),
  })
  .refine((data) => data.filter.id || data.filter.postId, {
    message: "At least one of id or postId is required",
    path: ["id", "postId"],
  });

export const PostImageDeleteRequestSchema = z.object({
  filter: z
    .object({
      id: z
        .union([z.string().cuid(), z.array(z.string().cuid())])
        .optional()
        .nullable(),
      postId: z.string().cuid().optional().nullable(),
    })
    .superRefine((data, ctx) => {
      if (!data.id) {
        ctx.addIssue({
          code: "custom",
          message: "Id is required",
          path: ["id"],
        });
        return;
      }

      if (Array.isArray(data.id) && !data.postId) {
        ctx.addIssue({
          code: "custom",
          message: "PostId is required when deleting multiple items",
          path: ["postId"],
        });
      }
    }),
  deleted: z.boolean(),
});
