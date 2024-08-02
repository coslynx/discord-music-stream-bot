const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const config = {
    discordToken: process.env.DISCORD_TOKEN,
    mongoDBUri: process.env.MONGODB_URI,
};

if (!config.discordToken) {
    throw new Error('Discord token is not defined. Please set DISCORD_TOKEN in your .env file.');
}

if (!config.mongoDBUri) {
    throw new Error('MongoDB URI is not defined. Please set MONGODB_URI in your .env file.');
}

module.exports = config;