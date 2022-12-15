const {transports,format,createLogger} = require("winston");
const {json,printf,timestamp,label,colorize} = format;

const myFormat = printf(({timestamp,label,level,message})=>{
  return `${timestamp} ${label} ${level} ${message}`;
});

const loggerConfig = {
  level: 'info',
  defaultMeta: { service: '' },
  transports: [
    new transports.File({ level: 'error',filename: 'logs/combined.log' }),
    new transports.Console({level: 'info'})
  ],
  format: format.combine(
    colorize(),
    label({label: "dev" }),
    timestamp({format:"MM/DD/YYYY HH:mm:ss A"}),
    myFormat
  )
};

const devLogger = () => {
    return createLogger(loggerConfig);
}
module.exports = devLogger;