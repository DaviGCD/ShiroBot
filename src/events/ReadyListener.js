const { Constants, EventListener } = require('../utils')
const LavalinkManager = require('../lavalink/LavalinkManager')
module.exports = class ReadyListener extends EventListener {
  constructor() {
    super('ready')
  }

  async run(client) {
    console.log('Connected')
    client.editStatus('online', [{
      state: `<:shiro:597315906284290067> @${client.user.username} | ${client.guilds.size} guilds`,
      type: 4
    }])

    client.lavalink = new LavalinkManager(client)
    await client.lavalink.connect()
    const commands = []
    client.commands.forEach(command => {
      if (!command.config?.slash) return
      commands.push(command.config.slash)
    })
    client.bulkEditCommands(commands).then(cmd => {
      for (const command of cmd) {
        client.slashCommands.set(command.name, command)
      }
    })
  }
}