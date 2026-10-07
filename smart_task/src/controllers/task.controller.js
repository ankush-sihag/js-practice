import { createTask } from "../services/task.service.js";

export async function createTaskController(req, res, next) {
    try {
        const task = await createTask(req.body);

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task
        });
    } catch (error) {
        next(error);
    }
}