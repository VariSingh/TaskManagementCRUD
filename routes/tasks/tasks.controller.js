const tasksService = require("./tasks.service");
exports.getTasks = async (req,res,next) => {
    try{
    const tasks =  await tasksService.getTasks();
    res.status(200).json(tasks);
    }catch(error){
        res.status(500).json({message:"Something went wrong I guess."});
    }

}

exports.getTaskById = async (req,res,next) => {
    try{
    const { id } = req.params;
    const tasks =  await tasksService.getTaskById(id);
    res.status(200).json(tasks);
    }catch(error){
        res.status(500).json({message:"Something went wrong I guess."});
    }

}

exports.createTask = async (req,res,next) => {
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

