const creds = require('../creds.js');
const axios = require('axios');
const Discord = require('discord.js');

const kelvin_difference = 273;

function getDayOfWeek(index) {
  let val = index%6;
  switch(val) {
    case 0:
      return "Sunday";
      break;
    case 1:
      return "Monday";
      break;
    case 2:
      return "Tuesday";
      break;
    case 3:
      return "Wednesday";
      break;
    case 4:
      return "Thursday";
      break;
    case 5:
      return "Friday";
      break;
    case 6:
      return "Saturday";
      break;
    default:
      break;    
  }
}

module.exports = {
  name: 'weather',
  description: 'Return weather conditions for campus',

  /* 
    Format:
    weather <campus>

    Notes:  
    <campus>
      - Burnaby / Surrey
  */

  execute(message, args) {

    const userID = message.author.tag;

    if (args.length == 0) {
      message.reply("Please enter a valid campus city (Vancouver, Burnaby, or Surrey)");
      return;
    }
    const campus = args[0].toLowerCase();
    const campus_formal = campus[0].toUpperCase() + campus.slice(1);
    let cityID;

    if (campus != "burnaby" && campus != "surrey" && campus != "vancouver") {
      message.reply("Please enter a valid campus city (Vancouver, Burnaby, or Surrey)");
      return;
    }

    switch(campus) {
      case "burnaby":
        cityID = "5911606";
        break;
      case "vancouver":
        cityID = "6173331";
        break;
      case "surrey":
        cityID = "6159905";
        break;
      default:
        break;
    }

    // make API call to openweathermap
    axios.get('https://api.openweathermap.org/data/2.5/forecast?id=' + cityID + '&appid=' + creds.weatherAPIKey)
    .then((resp) => {

      // console.log(resp.data);
      console.log(resp.data.list[0].main);
      console.log(resp.data.list[0].weather[0].description);
      console.log(resp.data.list[0].rain);
      console.log(resp.data.list[0].pop);
      console.log(resp.data.list[0].main.temp.toFixed(1));
      const tempCelsiusFirst = ((resp.data.list[0].main.temp) - kelvin_difference).toFixed(1);
      const weatherDescFirst = (resp.data.list[0].weather[0].description);
      const rainChanceFirst = ((resp.data.list[0].pop) * 100).toFixed(1);

      const tempCelsiusSecond = ((resp.data.list[1].main.temp) - kelvin_difference).toFixed(1);
      const weatherDescSecond = (resp.data.list[1].weather[0].description);
      const rainChanceSecond = ((resp.data.list[1].pop) * 100).toFixed(1);

      const tempCelsiusThird = ((resp.data.list[2].main.temp) - kelvin_difference).toFixed(1);
      const weatherDescThird = (resp.data.list[2].weather[0].description);
      const rainChanceThird = ((resp.data.list[2].pop) * 100).toFixed(1);

      const currDate = new Date();
      let index = currDate.getDay();
      const firstDay = getDayOfWeek(index);
      const secondDay = getDayOfWeek(index + 1);
      const thirdDay = getDayOfWeek(index + 2);

      // parse json object for temperature, weather conditions, and date?
      

      const attachment = new Discord.MessageAttachment('./resources/icons/partly_sunny.png', 'partly_sunny.png');

      const weatherEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`Weather for the Week`)
      .setURL('https://discord.js.org/')
      .setAuthor(`Here\'s your weather for the week, ${userID}`)
      .setDescription(`The ${campus_formal} campus is expected to have ${weatherDescFirst} today. Forecast predicts temperatures of ${tempCelsiusFirst}°C, with a ${rainChanceFirst}% chance of precipitation.`)
      .attachFiles(attachment)
      .setThumbnail('attachment://partly_sunny.png')  
      .addFields(
        { name: `${firstDay}`, value: `Expected Weather: ${weatherDescFirst}\n Temperature: ${tempCelsiusFirst}\n Chance of Rain: ${rainChanceFirst}%`, inline: true },
        { name: `${secondDay}`, value: `Expected Weather: ${weatherDescSecond}\n Temperature: ${tempCelsiusSecond}\n Chance of Rain: ${rainChanceSecond}%`, inline: true },
        { name: `${thirdDay}`, value: `Expected Weather: ${weatherDescThird}\n Temperature: ${tempCelsiusThird}\n Chance of Rain: ${rainChanceThird}%`, inline: true },

      )
      .setTimestamp()


      message.reply(weatherEmbed);

    })

  }
}


//5f7bb0d6d80189ea9610aa23c981d9f4
