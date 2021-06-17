const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const generalSchema = mongoose.Schema({
  guilds: {
    type: Array,
    default: [],
  },
  id: {
      type: String,
      default: undefined
  }
})

module.exports = mongoose.model('generalGroup', generalSchema)