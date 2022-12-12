const Sequelize = require("sequelize");

const sequelize = new Sequelize("task-management","root","",{
    dialect:"mysql",
    host:"localhost"
});

module.exports = sequelize;