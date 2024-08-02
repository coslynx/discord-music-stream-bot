const { MessageEmbed } = require('discord.js');
const { queue } = require('../services/queueService');

module.exports = {
    name: 'stop',
    description: 'Stops the music and leaves the voice channel.',
    execute(message) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.reply('You need to be in a voice channel to stop the music!');
        }

        if (!queue.connection) {
            return message.reply('The music bot is not currently playing anything.');
        }
        
        queue.songs = []; // Clear the queue
        queue.connection.disconnect(); // Leave the voice channel

        const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Stopped')
            .setDescription('The music playback has been stopped, and the bot has left the voice channel.')
            .setFooter('Thank you for listening!');

        message.channel.send({ embeds: [embed] });
    },
};