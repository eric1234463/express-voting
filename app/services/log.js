const { createLogger, format, transports } = require('winston');
const { combine, timestamp } = format;

const logger = createLogger({
  format: combine(
    timestamp(),
    format.json(),
    format.colorize(),
  ),
  transports: [new transports.Console()]
})


const log = (category, level, payload) => {
  return logger.log(level, {
    category,
    payload,
  })
}

module.exports = log;
