const express = require("express");
const router = express.Router();
const {getTasks,getTaskById,createTask,updateTask,updateTaskStatus,deleteTask} = require("./tasks.controller");
const { taskValidator,statusValidator,idValidator } = require("./tasks.validator");
const passport = require("passport");

//Private routes
router.get("/",passport.authenticate('jwt',{session:false}),getTasks);
router.get("/:id",passport.authenticate('jwt',{session:false}),idValidator,getTaskById);
router.patch("/:id/status",passport.authenticate('jwt',{session:false}),idValidator,statusValidator,updateTaskStatus);
router.post("/",passport.authenticate('jwt',{session:false}),taskValidator,createTask);
router.patch("/:id",passport.authenticate('jwt',{session:false}),idValidator,taskValidator,updateTask);

router.delete("/:id",passport.authenticate('jwt',{session:false}),idValidator,deleteTask);

module.exports = router;