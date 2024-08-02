const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        enum: ['YouTube', 'SoundCloud', 'Spotify', 'Other'],
        required: true,
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Refers to the User model
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the Song model from the schema
const Song = mongoose.model('Song', songSchema);

module.exports = Song;