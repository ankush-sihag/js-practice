import express from "express";

import {
    createTaskController,
    getAllTasksController,
    getTaskByIdController
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", createTaskController);

router.get("/", getAllTasksController);

router.get("/:id", getTaskByIdController);

export default router;