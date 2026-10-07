import express from "express";
import taskRoutes from "./routes/task.routes.js";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Smart Task API is running"
    });
});

app.use("/api/tasks", taskRoutes);

export default app;