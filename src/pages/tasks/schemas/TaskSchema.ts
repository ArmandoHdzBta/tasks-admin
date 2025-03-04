import { z } from "zod";

export const TaskSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    completed: z.boolean().default(false).optional(),
})