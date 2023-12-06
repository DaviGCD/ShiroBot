const mongoose = require('mongoose')
const Guild = new mongoose.Schema({
  _id: {
    type: String,
    unique: true
  },
  id: {
    type: String,
    default: ''
  },
  prefix: {
    type: String,
    default: process.env.PREFIX
  },
  lang: {
    type: String,
    default: 'en-US' 
  },
  dj_module: {
    type: Object,
    default: {
      role: '',
      channel: '',
      auto_play: false
    }
  },
  mod: {
    type: Object,
    default: {
      module: false,
      channel_log: '',
      punishment_message: '{@staff} {punishment} {@user}\nReason: {reason}'
    }
  },
  level: {
    type: Object,
    default: {
      module: false,
      roles: [{
        xp: 10_000,
        role_id: ''
      }],
      role_order: 1,
      level_up_message: '{@user} reached level **{lvl}**!'
    }
  },
  autorole: {
    type: Object,
    default: {
      module: false,
      roles: []
    }
  }
})

module.exports = mongoose.model('Guilds', Guild)