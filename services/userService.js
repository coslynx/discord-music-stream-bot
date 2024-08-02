const mongoose = require('mongoose');
const User = require('../models/userModel'); // Import the User model

// User service to manage user-related operations
class UserService {
    constructor() {
        // Ensure that the mongoose connection is established
        if (!mongoose.connection.readyState) {
            throw new Error('Database connection is not established.');
        }
    }

    // Method to create a new user in the database
    async createUser(userId, preferences = {}) {
        try {
            const existingUser = await User.findOne({ discordId: userId });
            if (existingUser) {
                return existingUser; // User already exists
            }

            const newUser = new User({
                discordId: userId,
                preferences: preferences,
                playlists: [],
                playingHistory: []
            });

            await newUser.save();
            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Could not create user. Please try again later.');
        }
    }

    // Method to get a user by Discord ID
    async getUserById(userId) {
        try {
            const user = await User.findOne({ discordId: userId }).populate('playlists');
            if (!user) {
                throw new Error('User not found.');
            }
            return user;
        } catch (error) {
            console.error('Error retrieving user:', error);
            throw new Error('Could not retrieve user information. Please try again later.');
        }
    }

    // Method to update user preferences
    async updateUserPreferences(userId, newPreferences) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { discordId: userId },
                { preferences: newPreferences },
                { new: true }
            ).populate('playlists'); // Return the updated user data with playlists

            if (!updatedUser) {
                throw new Error('User not found. Unable to update preferences.');
            }
            return updatedUser;
        } catch (error) {
            console.error('Error updating user preferences:', error);
            throw new Error('Could not update preferences. Please try again later.');
        }
    }

    // Method to add a song to the user's playing history
    async addToPlayingHistory(userId, song) {
        try {
            const user = await User.findOneAndUpdate(
                { discordId: userId },
                { $push: { playingHistory: song } },
                { new: true }
            );

            if (!user) {
                throw new Error('User not found. Unable to add to history.');
            }
            return user;
        } catch (error) {
            console.error('Error adding song to playing history:', error);
            throw new Error('Could not add song to history. Please try again later.');
        }
    }

    // Method to retrieve user's playing history
    async getPlayingHistory(userId) {
        try {
            const user = await User.findOne({ discordId: userId });
            if (!user) {
                throw new Error('User not found. Unable to retrieve history.');
            }
            return user.playingHistory;
        } catch (error) {
            console.error('Error retrieving playing history:', error);
            throw new Error('Could not retrieve playing history. Please try again later.');
        }
    }
}

module.exports = new UserService();