const { getSongInfo } = require('../services/musicService');
const { queue } = require('../services/queueService');

async function searchSong(message, query) {
    try {
        const songInfo = await getSongInfo(query);

        if (!songInfo) {
            return message.reply('Sorry, I couldn\'t find any songs matching your search.');
        }

        const song = {
            title: songInfo.title,
            url: songInfo.url,
        };

        queue.songs.push(song);

        if (!queue.connection) {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                return message.reply('You need to be in a voice channel to play music!');
            }
            const connection = await voiceChannel.join();
            queue.connection = connection;
            playSong(message.guild, queue.songs[0]);
        }

        message.channel.send(`${song.title} has been added to the queue.`);
    } catch (error) {
        console.error('Error during search:', error);
        message.reply('There was an error processing your request. Please try again.');
    }
}

function playSong(guild, song) {
    if (!song) {
        queue.connection.disconnect();
        return;
    }

    const dispatcher = queue.connection.play(song.url)
        .on('finish', () => {
            queue.songs.shift();
            playSong(guild, queue.songs[0]);
        })
        .on('error', error => console.error('Playback error:', error));

    dispatcher.setVolumeLogarithmic(queue.volume / 100);

    const embed = new MessageEmbed()
        .setColor('#00c6ff')
        .setTitle('Now Playing')
        .setDescription(`${song.title}`)
        .setFooter('Enjoy your music!');

    guild.channels.cache.find(channel => channel.name === 'general').send({ embeds: [embed] });
}

module.exports = {
    searchSong,
};