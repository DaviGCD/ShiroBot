require('dotenv').config()
module.exports = {
  owner: process.env.OWNERS.trim().split(','),
  options: {
    allowedMentions: {
      everyone: false,
      roles: false,
      users: true,
      repliedUser: true
    },
    defaultImageFormat: 'png',
    defaultImageSize: 1024,
    maxShards: process.env["TOTAL_SHARDS"],
    restMode: true,
    intents: 38559
  }
}