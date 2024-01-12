import winston from 'winston';
import expressWinston from 'express-winston';

// Request logger
export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log', dirname: './logs', maxFiles: 14 }),
  ],
  format: winston.format.json(),
});

// Error logger
export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log', dirname: './logs', maxFiles: 14 }),
  ],
  format: winston.format.json(),
});
