const express = require("express");

const app = express();

const PORT = 5000;

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Smart Task API is running"
    });
});

app.listen(PORT, () => {
    console.log(`Smart Task API running on port ${PORT}`);
});