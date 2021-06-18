const Discord = require('discord.js')
const generalSchema = require('../schemas/generalSchema')
const profileSchema = require('../schemas/guildSchema')
const mongo = require('../mongo')
require('dotenv').config()

module.exports = {
  minArgs: 0,
  maxArgs: 0,
  permissions: ['ADMINISTRATOR'],
  callback: async ({ message }) => {
    const id = "poo"
    let guildId = message.guild.id
    let counter = 1
    
    const questions = ["Guild added! Would you like to set up activity notifications? Respond with y/n", "What channel do you want notifications in? Respond with the channel or with null", "What do you want the activity notification message to be? Respond with a message or null"]
    const filter = m => m.author.id === message.author.id
    const collector = new Discord.MessageCollector(message.channel, filter, {
      max: questions.length
    })
    message.channel.send(questions[0])
    collector.on('collect', m => {
        if(counter < questions.length){
            m.channel.send(questions[counter++])
        }
    })
    collector.on('end', async (collected) => {
      
      collected.forEach(async (value) => {
        if(value == collected.first()){
          if(value.content == "y"){
            global.didMessageOn = true
            console.log("yes")
        }
        if(value.content == "n"){
            global.didMessageOn = false
            console.log("no")
        }
        if(!(value.content == "n" || value.content == "y")){
          message.reply("invalid answer, setup aborted")
          return;
        }
        await mongo().then(async (mongoose) => {
          try {
            const result = await generalSchema.findOneAndUpdate(
              {
                id
              },
              {
                id,
                $addToSet: {
                  guilds: message.guild.id,
                }
              },
              {
                upsert: true,
                new: true,
              }
            )
            const result2 = await profileSchema.findOneAndUpdate(
              {
                guildId: message.guild.id,
              },
              {
                $set:{
                  messageOn: didMessageOn
                }
              },
              {
                upsert: true,
                new: true,
              }
            )
          } finally {
            console.log("hell ya, mongo succeed")
          }
        })
        }
        
        if(value.content.startsWith("<#")){
          console.log("yessir")
          let replaced1 = value.content.replace("<#", "")
          let newchannelid = replaced1.replace(">", "")
          await mongo().then(async (mongoose) => {
            try {
              const result = await profileSchema.findOneAndUpdate(
                {
                  guildId
                },
                {
                  guildId,
                  $set: {
                    messageChannel: newchannelid
                  }
                },
                {
                  upsert: true,
                  new: true,
                }
              )
            } finally {
              console.log("hell ya, mongo succeed")
            }
          })
        }
        if(value == collected.last()){
          updateMessage(value.content)
        }
    })
    message.channel.send("Setup process finished! Thanks for adding us. ")

    })
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

async function updateMessage(message){
  await mongo().then(async (mongoose) => {
    try {
      const result = await profileSchema.findOneAndUpdate(
        {
          guildId
        },
        {
          guildId,
          $set: {
            messageContent: message
          }
        },
        {
          upsert: true,
          new: true,
        }
      )
    } finally {
      console.log("hell ya, mongo succeed")
    }
  })
}
