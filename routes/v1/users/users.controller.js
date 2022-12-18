const userService = require("./users.service");
const { validationResult } = require("express-validator");
const logger = require("../../../logger");

exports.signUp = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(442).json({error:errors})
    }
    
    try{
        const result =  await userService.signUp(req.body);
        res.status(200).json(result);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong I guess."});
    }
}

exports.signIn = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(442).json({error:errors})
    }
    
    try{
        const result =  await userService.signIn(req.body);
        console.log("result>> ",result);
        res.status(200).json(result);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong I guess."});
    }
}
