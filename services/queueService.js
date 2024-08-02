const { MessageEmbed } = require('discord.js');

const queue = {
    songs: [],
    connection: null,
    volume: 100,
};

function play(guild, song) {
    if (!song) {
        queue.connection.disconnect();
        return;
    }

    const dispatcher = queue.connection.play(song.url)
        .on('finish', () => {
            queue.songs.shift(); // Remove the song from the queue
            play(guild, queue.songs[0]); // Play the next song
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

function addToQueue(song) {
    queue.songs.push(song);
}

function clearQueue() {
    queue.songs = [];
}

function getQueue() {
    return queue.songs;
}

function setConnection(conn) {
    queue.connection = conn;
}

function getConnection() {
    return queue.connection;
}

function setVolume(vol) {
    queue.volume = vol;
    if (queue.connection) {
        queue.connection.dispatcher.setVolumeLogarithmic(vol / 100);
    }
}

function getVolume() {
    return queue.volume;
}

module.exports = {
    play,
    addToQueue,
    clearQueue,
    getQueue,
    setConnection,
    getConnection,
    setVolume,
    getVolume,
    queue,
};