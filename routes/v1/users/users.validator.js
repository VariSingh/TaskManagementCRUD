const { param, body, oneOf, header } = require("express-validator");
const mongoose = require("mongoose");
const {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} = require("../../../util/constants");

exports.userValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email can not be empty")
    .isEmail()
    .withMessage("Invalid email"),
  oneOf([
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password can not be empty")
      .isLength({ min: MIN_PASSWORD_LENGTH })
      .withMessage(
        `Password must be atleast ${MIN_PASSWORD_LENGTH} characters long`
      )
      .isLength({ max: MAX_PASSWORD_LENGTH })
      .withMessage(
        `Password must be atmost ${MIN_PASSWORD_LENGTH} characters long`
      ),
    body("facebookId")
      .trim()
      .notEmpty()
      .withMessage("Facebook Id can not be empty"),
  ]),
  header("fb-token")
    .if((value, { req }) => req.body.facebookId)
    .trim()
    .notEmpty()
    .withMessage("Facebook token can not be empty"),
];
