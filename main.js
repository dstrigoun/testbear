const fs = require('fs');
const Discord = require('discord.js');
const creds = require('./creds.js');

const testClient = new Discord.Client();
testClient.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    testClient.commands.set(command.name, command);
}

const prefix = "!";

testClient.once('ready', () => {
    console.log('weeee onlineee');
});

testClient.on("message", function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (!testClient.commands.has(command)) return;

    try {
        testClient.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

testClient.login(creds.token);

