const winston = require('winston');
const devLogger = require("./dev-logger");


if (process.env.NODE_ENV !== 'production') {
  logger = devLogger();
}else{
  logger = prodLogger();
}

module.exports = logger;