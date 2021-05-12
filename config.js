require('dotenv').config()
module.exports = {
  owner: ['318155799270522880', '456662676035076121', '395788326835322882'],
  options: {
    allowedMentions: {
      everyone: false,
      roles: false,
      users: true,
      repliedUser: true
    },
    defaultImageFormat: 'png',
    defaultImageSize: 2048,
    maxShards: 2,
    restMode: true,
    intents: 14073
  }
}