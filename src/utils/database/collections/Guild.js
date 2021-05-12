const mongoose = require('mongoose')
const Guild = new mongoose.Schema({
  _id: { type: String },
  prefix: { type: String, default: process.env.PREFIX },
  djRole: { type: String, default: '' },
  lang: { type: String, default: 'pt-BR' }
})

module.exports = mongoose.model('Guilds', Guild)