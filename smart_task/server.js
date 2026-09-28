const express = require("express");

const app = express();

const PORT = 3001;

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Smart Task API is running"
    });
});

app.get("/api/tasks", (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 1,
                title: "Learn JavaScript",
                priority: "HIGH"
            },
            {
                id: 2,
                title: "Build SmartTask",
                priority: "MEDIUM"
            }
        ]
    });
});

const server = app.listen(PORT, () => {
    console.log(`Smart Task API running on port ${PORT}`);
});
