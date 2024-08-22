import winston from "winston"
export const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }) 
    ],
})

export const logger2 = winston.createLogger({
    level : 'info',
    format: winston.format.json(),
    transports:[
        new winston.transports.File({filename:'log.txt'})
    ]
})
export const loggerMiddleware =  (req, res, next) => {
    if (!req.url.includes('signup') && !req.url.includes('signin')) {
          const logData = {
              url: req.url,
              body: req.body
          };
          logger2.info(logData)
        }
      
      next();
  };