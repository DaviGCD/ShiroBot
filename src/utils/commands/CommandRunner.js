const CommandContext = require('./CommandContext')
const { I18NModule, EmbedBuilder } = require('..')
const i18NModule = new I18NModule()

module.exports = class CommandRunner {
    static async run(client, message) {
        if (message.author.bot) return
        if (message.channel.type !== 0) return
        const user = await client.database.users.getOrCreate(message.author.id)
        const guild = await client.database.guilds.getOrCreate(message.guildID)
        const locale = i18NModule.getLocale(guild.lang)
        const clientGuild = await client.getRESTGuildMember(message.guildID, client.user.id)
        if (message.content === clientGuild.mention) {
            const embed = new EmbedBuilder()
            embed.setColor('DEFAULT')
            embed.setDescription(locale('basic:mention', { 0: guild.prefix }))

            message.channel.createMessage(Object.assign({ messageReferenceID: message.id }, embed.build()))
        }

        if (!message.content.toLowerCase().startsWith(guild.prefix)) return
        const args = message.content.slice(guild.prefix.length).trim().split(' ')
        const cmds = args.shift().toLowerCase()
        const cmd = client.commands.get(cmds) || client.commands.get(client.aliases.get(cmds))
        if (!cmd) return
        cmd.setLocale(locale)
        const ctx = new CommandContext(client, message, args, { user, guild }, locale)
        if (cmd.config.OnlyDevs) {
            if (!client.config.owner.includes(message.author.id)) return
        }
        // const UserPerms = {
        //     permissions: [],
        //     noPerm: true
        // }

        // const ClientPerms = {
        //     permissions: [],
        //     noPerm: true
        // }
        // for (const perms of cmd.config.ClientPermission) {
        //     const member = client.guilds.get(message.guildID).members.get(client.user.id)
        //     if (!member.permissions.has(perms)) {
        //         ClientPerms.permissions.push(perms)
        //         ClientPerms.noPerm = false
        //     }
        // }

        // if (!ClientPerms.noPerm) return
        message.channel.sendTyping()
        cmd.run(ctx)
    }
}