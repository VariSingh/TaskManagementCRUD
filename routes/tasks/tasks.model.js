const Sequelize = require("sequelize");

const sequelize = require("../../util/database");

const Task = sequelize.define("task",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:Sequelize.STRING,
    description:Sequelize.STRING,
    status:{
        type:Sequelize.STRING,
        defaultValue: "OPEN"
    }
});

module.exports = Task;