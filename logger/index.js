const winston = require('winston');
const devLogger = require("./dev-logger");
const DatadogWinston = require('datadog-winston');
const { DATADOG_API_KEY } = require('../util/config');

const dataDogWinston = new DatadogWinston({
  apiKey: DATADOG_API_KEY,
  hostname: 'localhost',
  service: 'Task management Express CRUD',
  ddsource: 'nodejs',
  ddtags: 'foo:bar,boo:baz'
})

if (process.env.NODE_ENV !== 'production') {
  logger = devLogger();
  logger.add(dataDogWinston);
}else{
  logger = prodLogger();
}

module.exports = logger;