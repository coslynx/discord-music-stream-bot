const express = require('express');
const { queue } = require('../services/queueService');
const { getSongInfo } = require('../services/musicService');
const { handleError } = require('../utils/errorHandler');

const router = express.Router();

router.post('/play', async (req, res) => {
    const { query } = req.body;
    const voiceChannel = req.member.voice.channel;

    if (!voiceChannel) {
        return res.status(400).json({ error: 'You need to be in a voice channel to play music!' });
    }

    if (!query) {
        return res.status(400).json({ error: 'Please provide a song name or URL to play.' });
    }

    try {
        const songInfo = await getSongInfo(query);
        if (!songInfo) {
            return res.status(404).json({ error: "Sorry, I couldn't find any songs matching your search." });
        }

        const song = {
            title: songInfo.title,
            url: songInfo.url,
        };

        queue.songs.push(song);

        if (!queue.connection) {
            queue.connection = await voiceChannel.join();
            play(req.guild, queue.songs[0]);
        } else {
            return res.status(200).json({ message: `${song.title} has been added to the queue.` });
        }
    } catch (error) {
        console.error(error);
        return handleError(res, error);
    }
});

router.post('/pause', (req, res) => {
    const voiceChannel = req.member.voice.channel;

    if (!voiceChannel) {
        return res.status(400).json({ error: 'You need to be in a voice channel to pause the music!' });
    }

    if (!queue.connection) {
        return res.status(400).json({ error: 'The music bot is not currently playing anything.' });
    }

    const dispatcher = queue.connection.dispatcher;

    if (dispatcher.paused) {
        return res.status(400).json({ error: 'The music is already paused.' });
    }

    dispatcher.pause();
    return res.status(200).json({ message: 'The music playback has been paused.' });
});

router.post('/skip', (req, res) => {
    const voiceChannel = req.member.voice.channel;

    if (!voiceChannel) {
        return res.status(400).json({ error: 'You need to be in a voice channel to skip a song!' });
    }

    if (!queue.connection) {
        return res.status(400).json({ error: 'The music bot is not currently playing anything.' });
    }

    if (queue.songs.length <= 1) {
        return res.status(400).json({ error: 'There are no more songs to skip to.' });
    }

    queue.songs.shift();
    const nextSong = queue.songs[0];

    play(req.guild, nextSong);
    return res.status(200).json({ message: `Skipped to the next song: ${nextSong.title}` });
});

router.post('/stop', (req, res) => {
    const voiceChannel = req.member.voice.channel;

    if (!voiceChannel) {
        return res.status(400).json({ error: 'You need to be in a voice channel to stop the music!' });
    }

    if (!queue.connection) {
        return res.status(400).json({ error: 'The music bot is not currently playing anything.' });
    }

    queue.songs = [];
    queue.connection.disconnect();
    return res.status(200).json({ message: 'The music playback has been stopped, and the bot has left the voice channel.' });
});

router.get('/queue', (req, res) => {
    if (queue.songs.length === 0) {
        return res.status(200).json({ message: 'The queue is currently empty.' });
    }

    return res.status(200).json({
        queue: queue.songs.map((song, index) => `${index + 1}. ${song.title}`),
    });
});

router.post('/search', async (req, res) => {
    const { query } = req.body;
    const voiceChannel = req.member.voice.channel;

    if (!voiceChannel) {
        return res.status(400).json({ error: 'You need to be in a voice channel to search for a song!' });
    }

    if (!query) {
        return res.status(400).json({ error: 'Please provide a song title or link to search for.' });
    }

    try {
        const songInfo = await getSongInfo(query);

        if (!songInfo) {
            return res.status(404).json({ error: "Sorry, I couldn't find any songs matching your search." });
        }

        const song = {
            title: songInfo.title,
            url: songInfo.url,
        };

        queue.songs.push(song);

        if (!queue.connection) {
            queue.connection = await voiceChannel.join();
            play(req.guild, queue.songs[0]);
        }

        return res.status(200).json({ message: `${song.title} has been added to the queue.` });
    } catch (error) {
        console.error(error);
        return handleError(res, error);
    }
});

function play(guild, song) {
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

module.exports = router;