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

    client.lavalink = new LavalinkManager(client)
    await client.lavalink.connect()
    const commands = []
    client.commands.forEach(command => {
    	if (!command.config?.slash) return
    	commands.push(command.config.slash)
	})
	client.bulkEditCommands(commands)
  }
}