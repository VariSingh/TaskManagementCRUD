const express = require("express");
const router = express.Router();
const tasksRouter = require("./tasks/tasks.routes");

router.use("/tasks",tasksRouter);


module.exports = router;