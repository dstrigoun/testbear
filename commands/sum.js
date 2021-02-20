module.exports = {
    name: 'sum',
    description: 'Returns sum of args',
    execute(message, args) {
        const numArgs = args.map(x => parseFloat(x));
        const sum = numArgs.reduce((counter, x) => counter += x);
        message.reply(`The sum of all the arguments you provided is ${sum}!`);
    }
}