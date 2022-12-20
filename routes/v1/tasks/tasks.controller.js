const tasksService = require("./tasks.service");
const { validationResult } = require("express-validator");
const logger = require("../../../logger");
const customResponse = require("../../../util/responseFormat");
exports.getTasks = async (req,res,next) => {
    try{
    const tasks =  await tasksService.getTasks();
    return customResponse.success(res,null, { tasks });
    }catch(error){
        logger.log({
            level:"error",
            message:"Something went wrong",
            service:"task"
        });
        return customResponse.internalServerError(res);
    }

}

exports.getTaskById = async (req,res,next) => {
    try{
    const { id } = req.params;
    const task =  await tasksService.getTaskById(id);
    logger.log({
        level:"info",
        message:`Task with id:${id} fetched`,
        service:"task"
    });
    return customResponse.success(res,null, { task });
    }catch(error){
        logger.log({
            level:"error",
            message:`Something went wrong I guess.`,
            service:"task"
        });
        return customResponse.internalServerError(res);
    }

}

exports.createTask = async (req,res,next) => {
    const errors = validationResult(req);
    console.log("validation failed ",errors);
    if(!errors.isEmpty()){
        console.log("validation failed ",errors);
        return customResponse.validationError(res, { error: errors });
    }
    
    try{
        const task =  await tasksService.createTask(req.body);
        return customResponse.success(res,"Task created", { task });
    }catch(error){
        return customResponse.internalServerError(res);
    }
}

exports.updateTask = async (req,res,next) => {
    try{
        const {title,description} = req.body;
        const {id} = req.params;
        const data = {
            title:title,
            description:description
        }
        const task =  await tasksService.updateTask(id,data);
        return customResponse.success(res,"Task updated", { task });
    }catch(error){
        return customResponse.internalServerError(res);
    }
}

exports.updateTaskStatus = async (req,res,next) => {
    try{
        const{status} = req.body;
        const {id} = req.params;
        const task =  await tasksService.updateTaskStatus(id,status);
        return customResponse.success(res,"Task status updated",{task});
    }catch(error){
        return customResponse.internalServerError(res);
    }
}

exports.deleteTask = async (req,res,next) => {
    try{
        const {id} = req.params;
        const task =  await tasksService.deleteTask(id);
        return customResponse.success(res,"Task deleted", { task });
    }catch(error){
        return customResponse.internalServerError(res);
    }
}

