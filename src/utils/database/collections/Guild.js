const mongoose = require('mongoose')
const { prefix } = require('../../../../config')
const Guild = new mongoose.Schema({
    _id: { type: String },
    prefix: { type: String, default: prefix },
    djRole: { type: String, default: '' },
    lang: { type: String, default: 'pt-BR' }
})

module.exports = mongoose.model('Guilds', Guild)