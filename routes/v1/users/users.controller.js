const userService = require("./users.service");
const { validationResult } = require("express-validator");
 const logger = require("../../../logger");
const customResponse = require("../../../util/responseFormat");

exports.signUp = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return customResponse.validationError(res,{errors:errors});
    }
    
    try{
        const access_token =  await userService.signUp(req.body);
        return customResponse.success(res,{access_token});
    }catch(error){
        if(error.code===11000){
            return customResponse.customError(res,"User already exists",null);
        }
        return customResponse.internalServerError(res);
    }
}

exports.signIn = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return customResponse.validationError(res,{errors:errors});
    }
    
    try{
        const token =  await userService.signIn(req.body);
        return customResponse.success(res,null,{access_token:token});
    }catch(error){
        return customResponse.internalServerError(res);
    }
}
