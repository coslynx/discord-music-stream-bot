const { MessageEmbed } = require('discord.js');
const { queue } = require('../services/queueService');

module.exports = {
    name: 'queue',
    description: 'Displays the current song queue.',
    execute(message) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.reply('You need to be in a voice channel to view the queue!');
        }

        if (queue.songs.length === 0) {
            return message.channel.send('The queue is currently empty.');
        }

        const embed = new MessageEmbed()
            .setColor('#00c6ff')
            .setTitle('Current Queue')
            .setDescription(queue.songs.map((song, index) => `${index + 1}. ${song.title}`).join('\n'))
            .setFooter('Use !play to start playing the songs.');

        message.channel.send({ embeds: [embed] });
    },
};