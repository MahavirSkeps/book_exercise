const winston = require('winston');

const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  };
   
const logger = winston.createLogger({
//   level : logLevels,
  transports: [
    new winston.transports.File({ filename: 'logs/buy-book.log'}),
    new winston.transports.Console({ level: 'debug' })
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

 

module.exports = logger;

 