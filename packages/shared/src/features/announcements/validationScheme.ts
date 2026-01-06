import { z } from "zod";

export const AnnounceCreateRequestSchema = z.object({
  data: z.object({
    title: z.string().max(128),
    content: z.string().max(2048),
    priority: z.number().int().min(1).max(5),
  }),
});

export const AnnounceUpdateRequestSchema = z.object({
  data: z.object({
    title: z.string().max(128).optional().nullable(),
    content: z.string().max(2048).optional().nullable(),
    priority: z.number().int().min(1).max(5).optional().nullable(),
  }),
});
