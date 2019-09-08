module.exports = class GuildDelete {
    constructor(client) {
        this.client = client
    }

    async run(guild) {

        console.info(`[INFO] | [GUILD REMOVE] - GUILD: ${guild.name} (${guild.id}) - OWNER: ${guild.owner.user.tag} (${guild.owner.user.id}) - TOTAL MEMBERS: ${guild.memberCount} members`)
        this.client.database.Guilds.deleteOne({
            _id: guild.id
        }, async function (err, server) {
            new this.client.database.Guilds({
                _id: guild.id
            })
        })
    }
}