const { EventListener } = require('../utils')

module.exports = class GuildCreateListener extends EventListener {
  constructor() {
    super('guildCreate')
  }

  async run(client, guild) {
    client.database.guilds.getOrCreate(guild.id)
  }
}