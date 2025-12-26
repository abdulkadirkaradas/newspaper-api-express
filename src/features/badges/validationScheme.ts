import { z } from "zod";

export const BadgeCreateRequestSchema = z.object({
  name: z.string().max(50),
  description: z.string().max(500),
  type: z.string().max(20),
  mimeType: z.string().max(20),
  fullpath: z.string().max(128),
});
