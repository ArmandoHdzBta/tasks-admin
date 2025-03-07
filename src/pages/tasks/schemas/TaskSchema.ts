import { z } from "zod";

export const TaskSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    completed: z.boolean().default(false).optional(),
})