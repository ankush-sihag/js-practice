import {
    createTask,
    getAllTasks,
    getTaskById
} from "../services/task.service.js";

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

export async function getAllTasksController(req, res, next) {
    try {
        const tasks = await getAllTasks();

        res.status(200).json({
            success: true,
            data: tasks
        });
    } catch (error) {
        next(error);
    }
}

export async function getTaskByIdController(req, res, next) {
    try {
        const task = await getTaskById(Number(req.params.id));

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        next(error);
    }
}