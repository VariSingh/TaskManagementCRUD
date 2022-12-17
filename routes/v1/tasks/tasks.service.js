const Task = require("./tasks.model");

exports.getTasks = async () => {
    return await Task.findAll();
}

exports.getTaskById = async (id) => {
    return await Task.findByPk(id);
}

exports.createTask = async (data) => {
    const {title,description} = data;
        return await Task.create({
        title:title,
        description:description,
    });
}

exports.updateTask = async (id,data) => {
        const {title,description} = data;
        return await Task.update({
            title:title,
            description:description,
        },{
            where:{
                id
            }
        });
}

exports.updateTaskStatus = async (id,status) => {
    return await Task.update({
        status
    },{
        where:{
            id
        }
    });
}

exports.deleteTask = async (id) => {
    return await Task.destroy({
        where:{
            id
        }
    })
}


