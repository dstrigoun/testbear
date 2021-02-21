module.exports = {
  name: 'date',
  description: 'Return link based on args?',


  /* 
    Format:
    date <event_name> <year>

    Notes:
    <year> is optional. If not included, treat as current year
  */
  execute(message, args) {

    const year = (args.length == 1) ? "current" : args[1];


    message.reply(`Your args: ${args}`);
  }
}