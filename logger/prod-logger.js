const {transports,format,createLogger} = require("winston");
const {json,printf,timestamp,label,colorize} = format;

const myFormat = printf(({timestamp,label,level,message})=>{
  return `${timestamp} ${label} ${level} ${message}`;
});

const loggerConfig = {
  level: 'info',
  defaultMeta: { service: '' },
  transports: [
    new transports.Console({level: 'info'}),
  ],
  format: format.combine(
    label({label: "prod" }),
    timestamp(),
    myFormat
  )
};

const prodLogger = () => {
    return createLogger(loggerConfig);
}
module.exports = prodLogger;