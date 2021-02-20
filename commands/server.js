module.exports = {
    name: 'server',
    description: 'Return server information',
    execute(message, args) {
        message.reply(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    }
}