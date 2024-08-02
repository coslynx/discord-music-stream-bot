const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    discordId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    preferences: {
        type: Object,
        default: {}
    },
    playlists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist'
    }],
    playingHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }]
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;