const guild = require('./collections/Guild')
const user = require('./collections/User')
const key = require('./collections/PremiumKey')
const Collection = require('./Collection')
const mongoose = require('mongoose')

module.exports = class Database {
  constructor() {
    try {
      mongoose.connect(process.env["MONGODB"])
    } catch(error) {
      console.log('Couldn\'t connect to the database.', error.message)
    } finally {
      console.log('Successfully connected to the database.')
    }

    this.guilds = new Collection(guild)
    this.users = new Collection(user)
    this.premiumkeys = new Collection(key)
  }
}