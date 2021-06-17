const Discord = require('discord.js')
const profileSchema = require('../schemas/guildSchema')
require('dotenv').config()

module.exports = {
  minArgs: 0,
  maxArgs: 0,
  callback: ({ message }) => {
    const result = profileSchema.findOne({guildId: message.guild.id }, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("no errors daddy, uwu")
            let { activity, time } = docs
            const activityrate = (activity / time) * 60;
            const embed = new Discord.MessageEmbed()
              .setTitle("Activity Rate/Hour")
              .addField("Activity", `${activityrate} messages per 60 minutes`)
              .addField("Time ran", `${time} minutes, to the nearest 10 minutes`)
              .setColor("0099ff")
              .setFooter(`S.A.M. v${botVersion}`)
            embed.attachFiles('./stonks.jpg')
            embed.setImage('attachment://stonks.jpg');
            message.channel.send(embed)
        }
    });
    
   
  }
}