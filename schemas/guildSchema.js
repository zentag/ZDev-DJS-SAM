const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const guildSchema = mongoose.Schema({
  guildId: reqString,
  activity: {
    type: Number,
    default: 0,
  },
  unconfactivity: {
    type: Number,
    default: 0,
  },
  time: {
    type: Number,
    default: 0,
  },
  messageOn: {
    type: Boolean,
    default: false,
  },
  messageChannel: {
    type: String,
    default: null,
  },
  messageContent: { 
    type: String,
    default: "STONKS, your activity rate is above normal!",
  },
})

module.exports = mongoose.model('guilds', guildSchema)