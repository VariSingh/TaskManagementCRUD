const express = require("express");
const router = express.Router();
const tasksController = require("./tasks.controller");


router.get("/",tasksController.getTasks);
router.get("/:id",tasksController.getTaskById);
router.post("/",tasksController.createTask);
router.patch("/:id",tasksController.updateTask);
router.patch("/:id/status",tasksController.updateTaskStatus);
router.delete("/:id",tasksController.deleteTask);

module.exports = router;