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

export async function getAllTasks(query) {
    const page = Math.max(Number(query.page) || 1, 1);

    const limit = Math.min(
        Math.max(Number(query.limit) || 10, 1),
        100
    );

    const offset = (page - 1) * limit;

    const tasks = await db.orm.public.Task
        .orderBy((task) => task.createdAt.desc())
        .limit(limit)
        .offset(offset)
        .all();

    const allTasks = await db.orm.public.Task.all();

    const total = allTasks.length;

    return {
        tasks,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasNextPage: page < Math.ceil(total / limit),
            hasPreviousPage: page > 1
        }
    };
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

    const updateData = {};

    if (data.title !== undefined) {
        updateData.title = data.title.trim();
    }

    if (data.description !== undefined) {
        updateData.description = data.description;
    }

    if (data.priority !== undefined) {
        updateData.priority = data.priority;
    }

    if (data.status !== undefined) {
        updateData.status = data.status;
    }

    if (data.dueDate !== undefined) {
        updateData.dueDate = data.dueDate;
    }

    const updatedTask = await db.orm.public.Task
        .where({ id })
        .update(updateData);

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