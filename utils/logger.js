const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console({
            level: 'info',
            handleExceptions: true,
        }),
        new transports.File({
            filename: 'error.log',
            level: 'error',
        }),
        new transports.File({ 
            filename: 'combined.log' 
        })
    ],
    exitOnError: false, // do not exit on handled exceptions
});

// Log an info message
logger.log({
    level: 'info',
    message: 'Logger initialized successfully'
});

// Log error messages
const logError = (error) => {
    if (error instanceof Error) {
        logger.error(error.message);
    } else {
        logger.error('An unexpected error occurred: ' + error);
    }
};

module.exports = {
    logger,
    logError,
};