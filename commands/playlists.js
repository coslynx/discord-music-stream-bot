const { MessageEmbed } = require('discord.js');
const Playlist = require('../models/playlistModel');

module.exports = {
    name: 'playlists',
    description: 'Manage your personal playlists.',
    async execute(message, args) {
        const subCommand = args[0];

        if (!subCommand) {
            return message.reply('Please specify an action: `create`, `add`, `remove`, or `view`.');
        }

        switch (subCommand.toLowerCase()) {
            case 'create':
                const playlistName = args[1];
                if (!playlistName) {
                    return message.reply('Please provide a name for the playlist.');
                }

                try {
                    const newPlaylist = new Playlist({ name: playlistName, ownerId: message.author.id, tracks: [] });
                    await newPlaylist.save();
                    return message.reply(`Playlist "${playlistName}" created successfully!`);
                } catch (error) {
                    console.error(error);
                    return message.reply('There was an error creating your playlist. Please try again.');
                }

            case 'add':
                const nameToAdd = args[1];
                const songUrl = args[2];
                
                if (!nameToAdd || !songUrl) {
                    return message.reply('Please provide the playlist name and the song URL to add.');
                }

                try {
                    const playlist = await Playlist.findOne({ name: nameToAdd, ownerId: message.author.id });
                    if (!playlist) {
                        return message.reply(`No playlist found with the name "${nameToAdd}".`);
                    }
                    playlist.tracks.push(songUrl);
                    await playlist.save();
                    return message.reply(`Song added to "${nameToAdd}" successfully!`);
                } catch (error) {
                    console.error(error);
                    return message.reply('There was an error adding the song. Please try again.');
                }

            case 'remove':
                const nameToRemove = args[1];
                const songToRemove = args[2];

                if (!nameToRemove || !songToRemove) {
                    return message.reply('Please provide the playlist name and the song URL to remove.');
                }

                try {
                    const playlist = await Playlist.findOne({ name: nameToRemove, ownerId: message.author.id });
                    if (!playlist) {
                        return message.reply(`No playlist found with the name "${nameToRemove}".`);
                    }
                    playlist.tracks = playlist.tracks.filter(track => track !== songToRemove);
                    await playlist.save();
                    return message.reply(`Song removed from "${nameToRemove}" successfully!`);
                } catch (error) {
                    console.error(error);
                    return message.reply('There was an error removing the song. Please try again.');
                }

            case 'view':
                const nameToView = args[1];

                if (!nameToView) {
                    return message.reply('Please specify the playlist name you want to view.');
                }

                try {
                    const playlist = await Playlist.findOne({ name: nameToView, ownerId: message.author.id });
                    if (!playlist) {
                        return message.reply(`No playlist found with the name "${nameToView}".`);
                    }
                    const embed = new MessageEmbed()
                        .setColor('#00c6ff')
                        .setTitle(`Playlist: ${playlist.name}`)
                        .setDescription(playlist.tracks.length ? playlist.tracks.join('\n') : 'No songs in this playlist.');

                    return message.channel.send({ embeds: [embed] });
                } catch (error) {
                    console.error(error);
                    return message.reply('There was an error retrieving your playlist. Please try again.');
                }

            default:
                return message.reply('Invalid action. Please specify `create`, `add`, `remove`, or `view`.');
        }
    },
};