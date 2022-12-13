const {check} = require("express-validator");

exports.createTaskValidator = [
    check("title").trim().not().isEmpty().withMessage("Title can not be empty"),
    check("description").trim().not().isEmpty().withMessage("Description can not be empty")
]