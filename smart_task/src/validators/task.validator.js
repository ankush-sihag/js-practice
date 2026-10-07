import { z } from "zod";

export const createTaskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required"),

    description: z
        .string()
        .trim()
        .optional(),

    priority: z
        .enum(["LOW", "MEDIUM", "HIGH"])
        .optional(),

    status: z
        .enum(["TODO", "IN_PROGRESS", "COMPLETED"])
        .optional(),

    dueDate: z
        .string()
        .datetime()
        .optional()
});