require('dotenv').config()
module.exports = {
  owner: process.env.OWNERS,
  options: {
    allowedMentions: {
      everyone: false,
      roles: false,
      users: true,
      repliedUser: true
    },
    defaultImageFormat: 'png',
    defaultImageSize: 2048,
    maxShards: process.env.TOTAL_SHARDS,
    restMode: true,
    intents: 14073
  }
}