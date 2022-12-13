const Sequelize = require("sequelize");
const config = require("./config");
console.log("config",config);
const sequelize = new Sequelize(config.DATABASE,config.USER,config.PASSWORD,{
    dialect:config.DIALECT,
    host:config.HOST
});

module.exports = sequelize;

