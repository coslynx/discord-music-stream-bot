const { MessageEmbed } = require('discord.js');
const { queue } = require('../services/queueService');

module.exports = {
    name: 'guildMemberAdd',
    execute(member) {
        const guild = member.guild;
        const generalChannel = guild.channels.cache.find(channel => channel.name === 'general');
        
        if (generalChannel) {
            const embed = new MessageEmbed()
                .setColor('#00c6ff')
                .setTitle('Welcome!')
                .setDescription(`Welcome to the server, ${member.displayName}! Feel free to enjoy music and interact with everyone.`)
                .setFooter('Enjoy your stay!');

            generalChannel.send({ embeds: [embed] });
        } else {
            console.error('General channel not found in the guild.');
        }
    },
};