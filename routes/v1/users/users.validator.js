const { param, body } = require("express-validator");
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
  body("password")
    .custom((value, { req }) => {
      if (req.body.facebookId) {
      }

      // Indicates the success of this synchronous custom validator
      return true;
    })

    //.trim().notEmpty().withMessage("Password can not be empty")
    .isLength({ min: MIN_PASSWORD_LENGTH })
    .withMessage(
      `Password must be atleast ${MIN_PASSWORD_LENGTH} characters long`
    )
    .isLength({ max: MAX_PASSWORD_LENGTH })
    .withMessage(
      `Password must be atmost ${MIN_PASSWORD_LENGTH} characters long`
    ),
];
