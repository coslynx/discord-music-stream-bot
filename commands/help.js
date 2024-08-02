const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays a list of available commands and their usage',
    execute(message) {
        const embed = new MessageEmbed()
            .setColor('#00c6ff')
            .setTitle('Available Commands')
            .setDescription('Here is a list of commands you can use with the music bot:')
            .addFields(
                { name: '!play <song>', value: 'Plays a song from YouTube or SoundCloud.' },
                { name: '!pause', value: 'Pauses the currently playing music.' },
                { name: '!skip', value: 'Skips to the next song in the queue.' },
                { name: '!stop', value: 'Stops the music and leaves the voice channel.' },
                { name: '!queue', value: 'Displays the current song queue.' },
                { name: '!search <song>', value: 'Search for a song to play it quickly.' },
                { name: '!volume <level>', value: 'Adjusts the volume of the bot (0-100).' },
                { name: '!playlists', value: 'Manage your personal playlists.' },
                { name: '!history', value: 'View the history of recently played songs.' },
                { name: '!help', value: 'Displays this help message.' }
            )
            .setFooter('Use commands prefix with ! for interaction.');

        message.channel.send({ embeds: [embed] });
    },
};