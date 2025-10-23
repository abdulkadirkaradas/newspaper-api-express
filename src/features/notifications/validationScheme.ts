import { z } from "zod";

export const NotificationCreateRequestSchema = z.object({
    title: z.string().max(100),
    content: z.string().max(1200),
    priority: z.number().min(1).max(3),
});