const commonService = require("./common.service");
const { validationResult } = require("express-validator");
const logger = require("../../../logger");
const customResponse = require("../../../util/responseFormat");

exports.uploadFile = async (req, res, next) => {
  try {
    return customResponse.success(res, "File uploaded", null);
  } catch (error) {
    return customResponse.internalServerError(res);
  }
};
