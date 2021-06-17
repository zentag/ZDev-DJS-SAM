const Discord = require("discord.js")
const mongoose = require('mongoose')
const mongo = require('../mongo')
const profileSchema = require('../schemas/guildSchema')

module.exports = (client) => {
    client.on('message', async (message) => {
        addUnconfActivity(message.guild.id)
    })

    const addUnconfActivity = async (guildId) => {
        await mongo().then(async (mongoose) => {
          try {
            const result = await profileSchema.findOneAndUpdate(
              {
                guildId
              },
              {
                guildId,
                $inc: {
                    unconfactivity: 1,
                },
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
}