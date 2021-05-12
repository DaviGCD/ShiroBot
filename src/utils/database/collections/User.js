const mongoose = require('mongoose')
const User = new mongoose.Schema({
    _id: { type: String },
    blacklist: { type: Boolean, default: false },
    blacklistreason: { type: String, default: '' }
})

module.exports = mongoose.model('Users', User)