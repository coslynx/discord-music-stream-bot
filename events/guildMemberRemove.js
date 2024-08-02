const { MessageEmbed } = require('discord.js');
const { queue } = require('../services/queueService');

module.exports = {
    name: 'guildMemberRemove',
    execute(member) {
        const guild = member.guild;
        const voiceChannel = guild.members.cache.get(member.id)?.voice.channel;

        if (voiceChannel && voiceChannel.members.size === 1) {
            queue.songs = []; // Clear the queue if the last user leaves
            if (queue.connection) {
                queue.connection.disconnect(); // Disconnect from the voice channel
            }

            const embed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Disconnected')
                .setDescription(`The bot has left the voice channel as the last user, ${member.displayName}, left the server.`)
                .setFooter('Thank you for using the music bot!');

            const generalChannel = guild.channels.cache.find(channel => channel.name === 'general');
            if (generalChannel) {
                generalChannel.send({ embeds: [embed] });
            }

            console.log(`Disconnected from ${voiceChannel.name} as ${member.displayName} left the server.`);
        }
    },
};