const { createLogger, format, transports } = require('winston');
const { MessageEmbed } = require('discord.js');
const { queue } = require('../services/queueService');

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
    exitOnError: false,
});

// Middleware to log commands and errors
module.exports = (req, res, next) => {
    const logRequest = () => {
        logger.info(`Received a ${req.method} request for ${req.url}`);
    };

    const logError = (error) => {
        if (error instanceof Error) {
            logger.error(error.message);
        } else {
            logger.error('An unexpected error occurred: ' + error);
        }
    };

    try {
        logRequest();
        next();
    } catch (error) {
        logError(error);
        
        const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Error Occurred')
            .setDescription('An error occurred while processing your request. Please try again later.')
            .setFooter('Error: ' + error.message);

        if (req.member && req.member.voice.channel) {
            req.member.voice.channel.send({ embeds: [embed] });
        }

        res.status(500).send('Internal Server Error');
    }

    // Log success message if response is sent
    res.on('finish', () => {
        logger.info(`Response sent with status code: ${res.statusCode}`);
    });
};

// Log an info message
logger.log({
    level: 'info',
    message: 'Logger initialized successfully'
});