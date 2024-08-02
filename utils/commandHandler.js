const fs = require('fs');
const path = require('path');

class CommandHandler {
    constructor() {
        this.commands = new Map();
        this.loadCommands();
    }

    loadCommands() {
        const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            this.commands.set(command.name, command);
        }
    }

    getCommand(name) {
        return this.commands.get(name);
    }
}

const commandHandler = new CommandHandler();

module.exports = {
    commandHandler,
};