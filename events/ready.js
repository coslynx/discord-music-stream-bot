const { Client, GatewayIntentBits } = require('discord.js');
const { queue } = require('../services/queueService');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);

        client.user.setActivity('your favorite tunes!', { type: 'LISTENING' });

        client.on('voiceStateUpdate', (oldState, newState) => {
            if (oldState.channelId && !newState.channelId) {
                // User leaves, check if there are any members in the channel
                const voiceChannel = oldState.channel;
                if (voiceChannel.members.size === 1) { // Only the bot is left
                    queue.songs = []; // Clear the queue if the last user leaves
                    queue.connection.disconnect(); // Disconnect from the voice channel
                    console.log(`Disconnected from ${voiceChannel.name} as the last user left.`);
                }
            }
        });
    },
};