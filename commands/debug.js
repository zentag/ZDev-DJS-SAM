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
  },
  error: ({ error, command, message, info }) => {
    // "error" holds one of the strings mentioned in the above list
    if (error === 'COMMAND DISABLED') {
      // For example we can now create and send a custom embed
      const embed = new Discord.MessageEmbed()
        .setTitle('Command disabled')
        .setColor(0xff0000)

      message.reply(embed)
    }
    if (error === 'MISSING PERMISSIONS') {
      // For example we can now create and send a custom embed
      const embed = new Discord.MessageEmbed()
        .setTitle('No Permissions!')
        .setDescription("This command requires administrator, which you do not have! \nMy user commands: \n**stonks?activity**")
        .setColor(0xff0000)
      embed.attachFiles('./notstonks.jpg')
      embed.setImage('attachment://notstonks.jpg');

      message.reply(embed)
    }
  },
}