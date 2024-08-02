const axios = require('axios');
const ytdl = require('ytdl-core');
const SoundCloudDownloader = require('soundcloud-downloader').default;
const { queue } = require('./queueService');
const dotenv = require('dotenv');

dotenv.config();

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';
const SOUND_CLOUD_API_URL = 'https://api.soundcloud.com/tracks';
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

async function getSongInfo(query) {
    if (query.includes('youtube.com') || query.includes('youtu.be')) {
        return await getYouTubeSongInfo(query);
    } else {
        return await getSoundCloudSongInfo(query);
    }
}

async function getYouTubeSongInfo(url) {
    const id = ytdl.getVideoID(url);
    const info = await ytdl.getInfo(id);
    return {
        title: info.videoDetails.title,
        url: info.videoDetails.video_url,
    };
}

async function getSoundCloudSongInfo(query) {
    const response = await SoundCloudDownloader.getSongInfo(query, {
        client_id: process.env.SOUNDCLOUD_CLIENT_ID,
    });
    if (!response) {
        throw new Error('Song not found on SoundCloud');
    }

    return {
        title: response.title,
        url: response.permalink_url,
    };
}

async function play(guild, song) {
    if (!song) {
        queue.connection.disconnect();
        return;
    }
    
    const dispatcher = queue.connection.play(song.url)
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
    getSongInfo,
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