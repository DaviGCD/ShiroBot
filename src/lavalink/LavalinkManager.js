const { Manager } = require('@lavacord/eris')
const LavalinkPlayer = require('./LavalinkPlayer')

// fallback for test env

try {
  connect = require('./LavalinkConfig')
} catch (e) {
  console.log('Couldn\'t find LavalinkConfig.js. Music support will be unavaliable.')
  connect = []
}

module.exports = class LavalinkManager {
  constructor (client) {
    this.client = client
    this.manager = new Manager(this.client, connect, {
      user: this.client.user.id,
      shards: parseInt(process.env.SHARD_COUNT)
    })
  }

  getBestHost () {
    return connect[Math.floor(Math.random() * connect.length)].id
  }

  async connect () {
    try {
      await this.manager.connect()
      console.log('Lavalink nodes has been sucessfully connected.')
    } catch (err) {
      console.log('it wasn\'t possible to connect to Lavalink.', err.message)
    }
  }

  async join (channel) {
    const manager = await this.manager.join({ channel, guild: this.client.getChannel(channel).guild.id, node: this.getBestHost() }, { selfdeaf: true })
    return new LavalinkPlayer(manager)
  }
}
