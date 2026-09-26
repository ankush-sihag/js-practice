const express = require("express");

const app = express();

const PORT = 5000;

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Smart Task API is running"
    });
});

const server = app.listen(PORT, () => {
    console.log(`Smart Task API running on port ${PORT}`);
});

server.on("error", (error) => {
    console.error("SERVER ERROR:", error);
});

process.on("exit", (code) => {
    console.log("NODE PROCESS EXITED WITH CODE:", code);
});

process.on("uncaughtException", (error) => {
    console.error("UNCAUGHT EXCEPTION:", error);
});