const { MessageEmbed } = require('discord.js');
const { queue } = require('../services/queueService');
const { commandHandler } = require('../utils/commandHandler');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        // Ignore messages from bots or without the command prefix
        if (message.author.bot || !message.content.startsWith('!')) return;

        const args = message.content.slice(1).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        
        // Command Handler invocation
        try {
            const command = commandHandler.getCommand(commandName);
            if (!command) return;

            await command.execute(message, args);
        } catch (error) {
            console.error(`Error executing command '${commandName}':`, error);
            message.reply('there was an error trying to execute that command!');
        }

        // Check if the user is in a voice channel
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply('You need to be in a voice channel to use music commands!');
        }

        // Command-specific behavior based on the command invoked
        switch (commandName) {
            case 'play':
                if (queue.songs.length === 0) {
                    return message.reply('The queue is empty. Please add a song to the queue first.');
                }
                break;
            case 'pause':
                if (!queue.connection) {
                    return message.reply('No music is currently playing.');
                }
                break;
            case 'skip':
                if (queue.songs.length <= 1) {
                    return message.reply('There are no more songs to skip to.');
                }
                break;
            case 'stop':
                if (!queue.connection) {
                    return message.reply('No music is currently playing.');
                }
                break;
            case 'volume':
                if (!args.length || isNaN(args[0]) || args[0] < 0 || args[0] > 100) {
                    return message.reply('Please specify a volume level between 0 and 100.');
                }
                break;
            default:
                break;
        }
    },
};