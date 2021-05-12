const { EventListener } = require('../utils')
const LavalinkManager = require('../lavalink/LavalinkManager')
module.exports = class ReadyListener extends EventListener {
  constructor() {
    super('ready')
  }

  async run(client) {
    console.log('Connected')
    setInterval(() => {
      client.editStatus('online', { name: `@${client.user.username} | ${client.guilds.size} guilds` })
    }, 15000)
    
    const lavalink = new LavalinkManager(client)
    client.lavalink = lavalink
    await lavalink.connect()
  }
}