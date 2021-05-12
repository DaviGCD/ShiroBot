const { EventListener } = require('../utils')
module.exports = class GuildDeleteListener extends EventListener {
  constructor() {
    super('guildDelete')
  }

  async run(client, guild) {

    console.info(`[INFO] | [GUILD REMOVE] - GUILD: ${guild.name} (${guild.id}) - OWNER: ${guild.owner.user.tag} (${guild.owner.user.id}) - TOTAL MEMBERS: ${guild.memberCount} members`)
    let server = await client.database.Guilds.findById(guild.id)
    if (server) {
      server.delete()
    }
  }
}