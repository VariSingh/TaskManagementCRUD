const express = require("express");
const router = express.Router();
const usersRouter = require("../v1/users/users.routes");
const tasksRouter = require("../v1/tasks/tasks.routes");

router.use("/users",usersRouter);
router.use("/tasks",tasksRouter);


module.exports = router;