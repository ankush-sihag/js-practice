import express from "express";

import {
    createTaskController,
    getAllTasksController,
    getTaskByIdController,
    updateTaskController,
    deleteTaskController
} from "../controllers/task.controller.js";

import { validate } from "../middleware/validate.js";

import {
    createTaskSchema,
    updateTaskSchema
} from "../validators/task.validator.js";


const router = express.Router();


router.post(
    "/",
    validate(createTaskSchema),
    createTaskController
);


router.get(
    "/",
    getAllTasksController
);


router.get(
    "/:id",
    getTaskByIdController
);


router.patch(
    "/:id",
    validate(updateTaskSchema),
    updateTaskController
);


router.delete(
    "/:id",
    deleteTaskController
);


export default router;