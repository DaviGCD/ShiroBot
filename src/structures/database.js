const mongoose = require("mongoose")
const config = require("../../config")
mongoose.connect(config.mongoose, {useNewUrlParser: true}, (err) => {
    if (err) return console.error(`Unable to connect to database ${err}`)
    console.info("Connected to database")
})
let Guild = new mongoose.Schema({
    _id: {type: String},
    prefix: {type: String, default: config.prefix},
    djRole: {type: String, default: ""},
    lang: {type: String, default: "pt-BR"}
})
let User = new mongoose.Schema({
    _id: {type: String},
    blacklist: {type: Boolean, default: false},
    blacklistreason: {type: String, default: ""}
})
let Guilds = mongoose.model("Guilds", Guild)
module.exports.Guilds = Guilds
let Users = mongoose.model("Users", User)
module.exports.Users = Users