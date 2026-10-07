import { db } from "../prisma/db.js";

export async function createTask(data) {
    if (!data.title || data.title.trim() === "") {
        const error = new Error("Title is required");
        error.statusCode = 400;
        throw error;
    }

    const task = await db.orm.public.Task.create({
        title: data.title.trim(),
        description: data.description ?? null,
        priority: data.priority ?? "MEDIUM",
        status: data.status ?? "TODO",
        dueDate: data.dueDate ?? null
    });

    return task;
}