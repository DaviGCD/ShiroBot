const { EventListener } = require('../utils')
module.exports = class GuildDeleteListener extends EventListener {
  constructor() {
    super('guildDelete')
  }

  async run(client, guild) {
    client.database.guilds.getAndDelete(guild.id)
  }
}