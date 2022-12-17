const Task = require("./tasks.model");

exports.getTasks = async () => {
    return await Task.find();
}

exports.getTaskById = async (id) => {
    return await Task.findById(id);
}

exports.createTask = async (data) => {
    const {title,description} = data;
        const task  = new Task({
        title:title,
        description:description
    });
    return await task.save();
}

exports.updateTask = async (id,data) => {
        const {title,description} = data;
        return await Task.findByIdAndUpdate({ _id: id },{
            title:title,
            description:description,
        });
}

exports.updateTaskStatus = async (id,status) => {
    return await Task.findByIdAndUpdate({ _id: id },{
        status
    });
}

exports.deleteTask = async (id) => {
    return await Task.findByIdAndDelete({ _id: id });
}


