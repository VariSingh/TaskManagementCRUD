const tasksService = require("./tasks.service");
const { validationResult } = require("express-validator");
const logger = require("../../logger");
exports.getTasks = async (req,res,next) => {
    try{
    const tasks =  await tasksService.getTasks();
    logger.info("something");
    res.status(200).json(tasks);
    }catch(error){
        logger.log({
            level:"error",
            message:"Something went wrong",
            service:"task"
        });
        res.status(500).json({message:"Something went wrong"});
    }

}

exports.getTaskById = async (req,res,next) => {
    try{
    const { id } = req.params;
    const tasks =  await tasksService.getTaskById(id);
    logger.log({
        level:"info",
        message:`Task with id:${id} fetched`,
        service:"task"
    });
    res.status(200).json(tasks);
    }catch(error){
        logger.log({
            level:"error",
            message:`Something went wrong I guess.`,
            service:"task"
        });
        res.status(500).json({message:"Something went wrong I guess."});
    }

}

exports.createTask = async (req,res,next) => {
    const errors = validationResult(req);
    console.log("validation failed ",errors);
    if(!errors.isEmpty()){
        console.log("validation failed ",errors);
        return res.status(442).json({error:errors})
    }
    
    try{
        const result =  await tasksService.createTask(req.body);
        res.status(200).json(result);
    }catch(error){
        res.status(500).json({message:"Something went wrong I guess."});
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
        const result =  await tasksService.updateTask(id,data);
        res.status(200).json(result);
    }catch(error){
        res.status(500).json({message:"Something went wrong I guess."});
    }
}

exports.updateTaskStatus = async (req,res,next) => {
    try{
        const{status} = req.body;
        const {id} = req.params;
        const result =  await tasksService.updateTaskStatus(id,status);
        res.status(200).json(result);
    }catch(error){
        res.status(500).json({message:"Something went wrong I guess."});
    }
}

exports.deleteTask = async (req,res,next) => {
    try{
        const {id} = req.params;
        const result =  await tasksService.deleteTask(id);
        res.status(200).json(result);
    }catch(error){
        res.status(500).json({message:"Something went wrong I guess."});
    }
}

