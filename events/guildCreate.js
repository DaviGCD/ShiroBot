module.exports = class GuildCreate {
    constructor(client) {
        this.client = client
    }

    async run(guild) {

        console.info(`[INFO] | [GUILD ADD] - GUILD: ${guild.name} (${guild.id}) - OWNER: ${guild.owner.user.tag} (${guild.owner.user.id}) - TOTAL MEMBERS: ${guild.memberCount} members`)
        let server = new this.client.database.Guilds({
            _id: guild.id
        })
        server.save()
        guild.channels.filter(c => c.type === "text").random().send(`Olá, eu sou ${this.client.user.username}, apenas outro Bot focado em música para o Discord, obrigada por me adicionar. Bom, atualmente eu tenho apenas um simples sistema de música e alguns comandos como o ping, se estiver com alguma dúvida ou tem ideia de algum comando que você queira, entre em meu servidor de suporte! Use \`${server.prefix}convite\`, se quiser saber a minha lista de comandos, use \`${server.prefix}comandos\`, até breve.`).catch(()=> {})    
    }
}