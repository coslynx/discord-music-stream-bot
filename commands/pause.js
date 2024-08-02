const { MessageEmbed } = require('discord.js');
const { queue } = require('../services/queueService');

module.exports = {
    name: 'pause',
    description: 'Pauses the currently playing music.',
    execute(message) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.reply('You need to be in a voice channel to pause the music!');
        }

        if (!queue.connection) {
            return message.reply('The music bot is not currently playing anything.');
        }

        const dispatcher = queue.connection.dispatcher;

        if (dispatcher.paused) {
            return message.reply('The music is already paused.');
        }

        dispatcher.pause();

        const embed = new MessageEmbed()
            .setColor('#00c6ff')
            .setTitle('Paused')
            .setDescription('The music playback has been paused. Use `!play` to continue playback.')
            .setFooter('Enjoy your music!');

        message.channel.send({ embeds: [embed] });
    },
};