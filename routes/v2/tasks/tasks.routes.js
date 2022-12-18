const express = require("express");
const { authenthorize } = require("../../../middlewares/auth.middleware");
const router = express.Router();
const {getTasks,getTaskById,createTask,updateTask,updateTaskStatus,deleteTask} = require("./tasks.controller");
const { taskValidator,statusValidator,idValidator } = require("./tasks.validator");

//Private routes
router.get("/",authenthorize,getTasks);
router.get("/:id",authenthorize,idValidator,getTaskById);
router.patch("/:id/status",authenthorize,idValidator,statusValidator,updateTaskStatus);
router.post("/",authenthorize,taskValidator,createTask);
router.patch("/:id",authenthorize,idValidator,taskValidator,updateTask);

router.delete("/:id",authenthorize,idValidator,deleteTask);

module.exports = router;