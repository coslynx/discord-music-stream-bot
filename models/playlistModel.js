const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    tracks: [{
        type: String,
        required: true
    }]
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Create the Playlist model from the schema
const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;