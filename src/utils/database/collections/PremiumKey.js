const { Schema, model } = require('mongoose')

const key = new Schema({
  id: { type: String },
  keys: {
    type: Array,
    default: []
  }
})

module.exports = model('PremiumKey', key)