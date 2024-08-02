const { MessageEmbed } = require('discord.js');

function handleError(message, error) {
    console.error(error);

    const embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Error Occurred')
        .setDescription('An error occurred while processing your request. Please try again later.')
        .setFooter('Error: ' + error.message);

    message.channel.send({ embeds: [embed] });
}

module.exports = {
    handleError
};