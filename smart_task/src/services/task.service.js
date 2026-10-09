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

    const status = query.status;
    const priority = query.priority;
    const search = query.search?.trim();

    let taskQuery = db.orm.public.Task;

    if (status) {
        taskQuery = taskQuery.where({
            status
        });
    }

    if (priority) {
        taskQuery = taskQuery.where({
            priority
        });
    }

    if (search) {
        taskQuery = taskQuery.where({
            title: {
                contains: search,
                mode: "insensitive"
            }
        });
    }

    const tasks = await taskQuery
        .orderBy((task) => task.createdAt.desc())
        .limit(limit)
        .offset(offset)
        .all();

    let countQuery = db.orm.public.Task;

    if (status) {
        countQuery = countQuery.where({ status });
    }

    if (priority) {
        countQuery = countQuery.where({ priority });
    }

    if (search) {
        countQuery = countQuery.where({
            title: {
                contains: search,
                mode: "insensitive"
            }
        });
    }

    const allTasks = await countQuery.all();

    const total = allTasks.length;
    const totalPages = Math.ceil(total / limit);

    return {
        tasks,
        pagination: {
            page,
            limit,
            total,
            totalPages,
            hasNextPage: page < totalPages,
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