import express from "express";

import {
    createTaskController,
    getAllTasksController,
    getTaskByIdController
} from "../controllers/task.controller.js";

import { validate } from "../middleware/validate.js";
import { createTaskSchema } from "../validators/task.validator.js";

const router = express.Router();

router.post(
    "/",
    validate(createTaskSchema),
    createTaskController
);

router.get("/", getAllTasksController);

router.get("/:id", getTaskByIdController);

export default router;