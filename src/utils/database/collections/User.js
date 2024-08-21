const mongoose = require('mongoose')
const User = new mongoose.Schema({
  id: { type: String },
  global_xp: {
    type: Number,
    default: 0
  },
  blacklist: {
    type: Object,
    default: {
      banned: false,
      banned_by: '',
      date: '',
      expire_in: 0,
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
      plan: '',
      donated_at: 0,
      expire_in: 0,
      total_donated: 0,
      keys: []
    }
  }
})

module.exports = mongoose.model('Users', User)