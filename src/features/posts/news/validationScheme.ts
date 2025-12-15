import { z } from "zod";

export const NewsCreateRequestSchema = z.object({
  title: z.string().max(100),
  content: z.string().max(1200),
  categoryId: z.cuid(),
});

export const NewsUpdateRequestSchema = z.object({
  title: z.string().max(100).optional().nullable(),
  content: z.string().max(1200).optional().nullable(),
  categoryId: z.cuid().optional().nullable(),
});

export const NewsStatusUpdateRequestSchema = z.object({
  pinned: z.boolean().optional().nullable(),
  visibility: z.boolean().optional().nullable(),
  deleted: z.boolean().optional().nullable(),
});
