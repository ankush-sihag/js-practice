const express = require("express");

const app = express();

const PORT = 3000;

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Smart Task API is running"
    });
});