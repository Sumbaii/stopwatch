const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "docs")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "docs", "index.html"));
});

app.listen(3000, () => {
    console.log("Sever running at http://localhost:3000");
});