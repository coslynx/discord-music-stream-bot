const { MessageEmbed } = require('discord.js');
const { queue } = require('../services/queueService');

module.exports = {
    name: 'skip',
    description: 'Skips to the next song in the queue.',
    execute(message) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.reply('You need to be in a voice channel to skip a song!');
        }

        if (!queue.connection) {
            return message.reply('The music bot is not currently playing anything.');
        }

        if (queue.songs.length <= 1) {
            return message.reply('There are no more songs to skip to.');
        }

        queue.songs.shift(); // Remove the current song from the queue
        const nextSong = queue.songs[0];

        const embed = new MessageEmbed()
            .setColor('#00c6ff')
            .setTitle('Skipped')
            .setDescription(`Skipped to the next song: ${nextSong.title}`)
            .setFooter('Enjoy your music!');

        message.channel.send({ embeds: [embed] });

        play(message.guild, nextSong); // Play the next song in the queue
    },
};

function play(guild, song) {
    const queueResult = queue.songs[0];

    if (!queueResult) {
        queue.connection.disconnect();
        return;
    }

    const dispatcher = queue.connection.play(queueResult.url)
        .on('finish', () => {
            queue.songs.shift();
            play(guild, queue.songs[0]);
        })
        .on('error', error => console.error(error));

    dispatcher.setVolumeLogarithmic(queue.volume / 100);

    const embed = new MessageEmbed()
        .setColor('#00c6ff')
        .setTitle('Now Playing')
        .setDescription(`${song.title}`)
        .setFooter('Enjoy your music!');

    guild.channels.cache.find(channel => channel.name === 'general').send({ embeds: [embed] });
}