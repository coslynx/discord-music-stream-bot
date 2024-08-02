const { PermissionFlagsBits } = require('discord.js');

module.exports = (req, res, next) => {
    const permissions = req.member.permissions;

    // Check if user has permission to use music commands
    if (!permissions.has(PermissionFlagsBits.Connect) || !permissions.has(PermissionFlagsBits.Speak)) {
        return res.status(403).json({ error: 'You do not have permission to use this command. Please ensure you have the necessary permissions to connect and speak in voice channels.' });
    }

    next();
};