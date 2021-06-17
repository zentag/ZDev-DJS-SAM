const Discord = require("discord.js")
require('dotenv').config()

module.exports = {
  minArgs: 0,
  maxArgs: 0,
  permissions: ['ADMINISTRATOR'],
  callback: ({ message }) => {
    const embed = new Discord.MessageEmbed()
      .setTitle("Debug Info")
      .addField("Version", botVersion)
      .addField("Mode", mode)
      .setColor("0099ff")
      .setFooter(`S.A.M. v${botVersion}`)
    message.channel.send(embed)
  }
}