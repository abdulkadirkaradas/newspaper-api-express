import { z } from "zod";

export const AnnounceCreateRequestSchema = z.object({
  title: z.string().max(128),
  content: z.string().max(2048),
  priority: z.int().min(1).max(5),
});
