import { z } from "zod";

export const NotificationCreateRequestSchema = z.object({
    content: z.string().max(255),
    reason: z.string().max(25),
    warningLevel: z.number().min(1).max(5),
});