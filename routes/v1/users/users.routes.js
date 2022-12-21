const express = require("express");
const router = express.Router();
const { signUp, signIn, getAccessToken } = require("./users.controller");
const { userValidator } = require("./users.validator");

router.post("/signup", userValidator, signUp);
router.post("/signin", signIn);
router.get("/token", getAccessToken);

module.exports = router;
