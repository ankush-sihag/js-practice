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

export async function getAllTasks() {
    return await db.orm.public.Task
        .orderBy((task) => task.createdAt.desc())
        .all();
}

export async function getTaskById(id) {
    const task = await db.orm.public.Task.first({
        id
    });

    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    return task;
}

export async function updateTask(id, data) {
    const existingTask = await db.orm.public.Task.first({
        id
    });

    if (!existingTask) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    const updatedTask = await db.orm.public.Task
        .where({ id })
        .update({
            title: data.title.trim(),
            description: data.description ?? null,
            priority: data.priority,
            status: data.status,
            dueDate: data.dueDate ?? null
        })
        .returning()
        .first();

    return updatedTask;
}

export async function deleteTask(id) {
    const existingTask = await db.orm.public.Task.first({
        id
    });

    if (!existingTask) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    await db.orm.public.Task
        .where({ id })
        .delete();

    return existingTask;
}