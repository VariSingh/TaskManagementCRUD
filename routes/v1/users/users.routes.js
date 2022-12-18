const express = require("express");
const router = express.Router();
const {signUp,signIn} = require("./users.controller");
const { userValidator } = require("./users.validator");

router.post("/signup",userValidator,signUp);
router.post("/signin",signIn);

module.exports = router;