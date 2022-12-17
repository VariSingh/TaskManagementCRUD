const express = require("express");
const router = express.Router();
const {getTasks,getTaskById,createTask,updateTask,updateTaskStatus,deleteTask} = require("./tasks.controller");
const { taskValidator,statusValidator,idValidator } = require("./tasks.validator");

router.get("/",getTasks);
router.get("/:id",idValidator,getTaskById);
router.patch("/:id/status",idValidator,statusValidator,updateTaskStatus);
router.post("/",taskValidator,createTask);
router.patch("/:id",idValidator,taskValidator,updateTask);

router.delete("/:id",idValidator,deleteTask);

module.exports = router;