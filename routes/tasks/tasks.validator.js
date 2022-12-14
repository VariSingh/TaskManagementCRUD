const {check} = require("express-validator");
const {DONE,OPEN,IN_PROGRESS} = require("../../util/constants");
const statusValus = [
    OPEN,
    IN_PROGRESS,
    DONE
]

exports.taskValidator = [
    check("title").trim().not().isEmpty().withMessage("Title can not be empty"),
    check("description").trim().not().isEmpty().withMessage("Description can not be empty")
]

exports.statusValidator = [
    check("status").trim().not().isEmpty().withMessage("Status can not be empty")
]