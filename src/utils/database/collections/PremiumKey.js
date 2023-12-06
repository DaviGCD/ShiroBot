const { Schema, model} = require('mongoose')

const key = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  keys: {
    type: Array,
    default: [{
      id: '',
      created_at: Date.now(),
      expire_in: Date.now() + 2628000,
      guild_id: '',
      value: 10
    }]
  }
})

module.exports = model('PremiumKey', key)