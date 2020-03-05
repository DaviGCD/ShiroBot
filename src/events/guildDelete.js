module.exports = class GuildDelete {
    constructor(client) {
        this.client = client
    }

    async run(guild) {

        console.info(`[INFO] | [GUILD REMOVE] - GUILD: ${guild.name} (${guild.id}) - OWNER: ${guild.owner.user.tag} (${guild.owner.user.id}) - TOTAL MEMBERS: ${guild.memberCount} members`)
        let server = await this.client.database.Guilds.findById(guild.id)
        if (server) {
            server.delete()
        }
    }
}