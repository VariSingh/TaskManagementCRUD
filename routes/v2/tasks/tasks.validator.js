const {param,body} = require("express-validator");
const {DONE,OPEN,IN_PROGRESS} = require("../../../util/constants");
const mongoose = require("mongoose");
const statusValues = [
    OPEN,
    IN_PROGRESS,
    DONE
]

exports.taskValidator = [
    body("title").trim().notEmpty().withMessage("Title can not be empty"),
    body("description").trim().notEmpty().withMessage("Description can not be empty")
]

exports.statusValidator = [
    body("status").trim().notEmpty().withMessage("Status can not be empty").isIn(statusValues).withMessage(`Status should have one of thesevalues - ${statusValues.toString()}`)
]

exports.idValidator = [
    param("id").custom((id)=>mongoose.isValidObjectId(id)).withMessage("Invalid id format")
]