const { PermissionFlagsBits } = require('discord.js');

module.exports = (req, res, next) => {
    const member = req.member;

    // Check if the user is in a voice channel
    if (!member.voice.channel) {
        return res.status(403).json({ error: 'You must be in a voice channel to use this command.' });
    }

    // Check if user has permission to connect and speak
    const permissions = member.permissions;
    if (!permissions.has(PermissionFlagsBits.Connect) || !permissions.has(PermissionFlagsBits.Speak)) {
        return res.status(403).json({ error: 'You do not have permission to use music commands. Please ensure you have the necessary permissions to connect and speak in voice channels.' });
    }

    next();
};