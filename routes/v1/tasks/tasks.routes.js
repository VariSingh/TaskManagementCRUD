const express = require("express");
const router = express.Router();
const {getTasks,getTaskById,createTask,updateTask,updateTaskStatus,deleteTask} = require("./tasks.controller");
const { taskValidator,statusValidator } = require("./tasks.validator");

router.get("/",getTasks);
router.get("/:id",getTaskById);
router.patch("/:id/status",statusValidator,updateTaskStatus);
router.post("/",taskValidator,createTask);
router.patch("/:id",updateTask);

router.delete("/:id",deleteTask);

module.exports = router;