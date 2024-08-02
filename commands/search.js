const { MessageEmbed } = require('discord.js');
const { getSongInfo } = require('../services/musicService');
const { queue } = require('../services/queueService');

module.exports = {
    name: 'search',
    description: 'Search for a song and play it.',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.reply('You need to be in a voice channel to search for a song!');
        }

        if (!args.length) {
            return message.reply('Please provide a song title or link to search for.');
        }

        const searchQuery = args.join(' ');

        try {
            const songInfo = await getSongInfo(searchQuery);

            if (!songInfo) {
                return message.reply('Sorry, I couldn\'t find any songs matching your search.');
            }

            const song = {
                title: songInfo.title,
                url: songInfo.url,
            };

            queue.songs.push(song);

            if (!queue.connection) {
                const connection = await voiceChannel.join();
                queue.connection = connection;
                play(message.guild, queue.songs[0]);
            }

            const embed = new MessageEmbed()
                .setColor('#00c6ff')
                .setTitle('Song Added to Queue')
                .setDescription(`${song.title} has been added to the queue.`)
                .setFooter('Use !play to start playing queued songs.');

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.reply('There was an error processing your request. Please try again.');
        }
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