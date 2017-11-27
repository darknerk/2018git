import winston from "winston";
import path from 'path'

winston.emitErrs = true;

const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: "info",
      name: "info",
      filename: path.join(__dirname,'logs','access.log'),
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: true
    }),
    new winston.transports.File({
      level: "verbose",
      name: "elasticsearch",
      filename: path.join(__dirname,'logs','elasticsearch.log'),
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: true
    }),
    new winston.transports.File({
      level: "error",
      name: "error",
      filename: path.join(__dirname,'logs','errors.log'),
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: true
    }),
    new winston.transports.Console({
      colorize: true,
      level: "warning"
    })
  ]
});

logger.stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};

module.exports = logger