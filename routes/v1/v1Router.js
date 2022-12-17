const express = require("express");
const router = express.Router();
const tasksRouter = require("../v1/tasks/tasks.routes");

router.use("/tasks",tasksRouter);


module.exports = router;