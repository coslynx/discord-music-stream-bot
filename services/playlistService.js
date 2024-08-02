const Playlist = require('../models/playlistModel'); // Import the Playlist model

class PlaylistService {
    // Create a new playlist in the database
    async createPlaylist(ownerId, name) {
        try {
            const newPlaylist = new Playlist({ name, ownerId, tracks: [] });
            await newPlaylist.save();
            return newPlaylist;
        } catch (error) {
            console.error('Error creating playlist:', error);
            throw new Error('Could not create playlist. Please try again later.');
        }
    }

    // Add a track to an existing playlist
    async addTrackToPlaylist(ownerId, playlistName, track) {
        try {
            const playlist = await Playlist.findOne({ name: playlistName, ownerId });
            if (!playlist) {
                throw new Error(`Playlist "${playlistName}" not found.`);
            }
            playlist.tracks.push(track);
            await playlist.save();
            return playlist;
        } catch (error) {
            console.error('Error adding track to playlist:', error);
            throw new Error('Could not add track to playlist. Please try again later.');
        }
    }

    // Remove a track from an existing playlist
    async removeTrackFromPlaylist(ownerId, playlistName, track) {
        try {
            const playlist = await Playlist.findOne({ name: playlistName, ownerId });
            if (!playlist) {
                throw new Error(`Playlist "${playlistName}" not found.`);
            }
            playlist.tracks = playlist.tracks.filter(t => t !== track);
            await playlist.save();
            return playlist;
        } catch (error) {
            console.error('Error removing track from playlist:', error);
            throw new Error('Could not remove track from playlist. Please try again later.');
        }
    }

    // View all playlists for a user
    async viewPlaylists(ownerId) {
        try {
            const playlists = await Playlist.find({ ownerId });
            return playlists;
        } catch (error) {
            console.error('Error retrieving playlists:', error);
            throw new Error('Could not retrieve playlists. Please try again later.');
        }
    }

    // Retrieve a specific playlist
    async getPlaylist(ownerId, playlistName) {
        try {
            const playlist = await Playlist.findOne({ name: playlistName, ownerId });
            if (!playlist) {
                throw new Error(`Playlist "${playlistName}" not found.`);
            }
            return playlist;
        } catch (error) {
            console.error('Error retrieving playlist:', error);
            throw new Error('Could not retrieve the playlist. Please try again later.');
        }
    }
}

module.exports = new PlaylistService(); // Export an instance of PlaylistService