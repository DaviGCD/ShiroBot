const guild = require('./collections/Guild')
const user = require('./collections/User')
const Collection = require('./Collection')
const mongoose = require('mongoose')

module.exports = class Database {
    constructor() {
        mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) return console.error(`Unable to connect to database ${err}`)
            console.log('Connected to database')
        })

        this.guilds = new Collection(guild)
        this.users = new Collection(user)
    }
}