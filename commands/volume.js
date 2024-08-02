const { MessageEmbed } = require('discord.js');
const { queue } = require('../services/queueService');

module.exports = {
    name: 'volume',
    description: 'Adjusts the volume of the bot (0-100).',
    execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.reply('You need to be in a voice channel to adjust the volume!');
        }

        if (args.length === 0) {
            return message.reply(`The current volume is ${queue.volume}.`);
        }

        const volume = parseInt(args[0]);

        if (isNaN(volume)) {
            return message.reply('Please provide a valid number between 0 and 100 to set the volume.');
        }

        if (volume < 0 || volume > 100) {
            return message.reply('Volume must be between 0 and 100.');
        }

        queue.volume = volume;
        queue.connection.dispatcher.setVolumeLogarithmic(volume / 100); // Convert to logarithmic scale

        const embed = new MessageEmbed()
            .setColor('#00c6ff')
            .setTitle('Volume Updated')
            .setDescription(`The volume has been set to ${volume}%.`)
            .setFooter('Use the command again to adjust the volume further.');

        message.channel.send({ embeds: [embed] });
    },
};