const express = require("express");
const router = express.Router();
const {getTasks,getTaskById,createTask,updateTask,updateTaskStatus,deleteTask} = require("./tasks.controller");
const { taskValidator,statusValidator } = require("./tasks.validator");
const passport = require("passport");

router.get("/",passport.authenticate('jwt',{session:false}),getTasks);
router.get("/:id",passport.authenticate('jwt',{session:false}),getTaskById);
router.patch("/:id/status",passport.authenticate('jwt',{session:false}),statusValidator,updateTaskStatus);
router.post("/",passport.authenticate('jwt',{session:false}),taskValidator,createTask);
router.patch("/:id",passport.authenticate('jwt',{session:false}),updateTask);

router.delete("/:id",passport.authenticate('jwt',{session:false}),deleteTask);

module.exports = router;