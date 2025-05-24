import winston from 'winston'

const level = (process.env.NODE_ENV !== 'dev') ? 'info' : 'debug'

const logger = winston.createLogger({
  level,
  transports: [new winston.transports.Console()],
  format: winston.format.cli(),
})

globalThis.logger = logger

export { logger }
