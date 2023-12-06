const mongoose = require('mongoose')
const User = new mongoose.Schema({
  _id: {
    type: String,
    unique: true
  },
  global_xp: {
    type: Number,
    default: 0
  },
  blacklist: {
    type: Object,
    default: {
      banned: false,
      reason: ''
    }
  },
  level: {
    type: Array,
    default: [{
      guild_id: '',
      xp: 0,
      level: 0,
      total_xp: 1_000
    }]
  },
  punishment: {
    type: Array,
    default: [{
      guild_id: '',
      punished_by: '',
      date: new Date(),
      reason: ''
    }]
  },
  premium: {
    type: Object,
    default: {
      plan: 0,
      donated_at: new Date(),
      expire_in: new Date()
    }
  }
})

module.exports = mongoose.model('Users', User)