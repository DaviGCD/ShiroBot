const { Command, EmbedBuilder } = require('../../utils')
module.exports = class InviteCommand extends Command {
    constructor() {
        super({
            name: 'invite',
            aliases: ['convite', 'convidar', 'adicionar'],
            category: 'misc',
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false
        })
    }

    run(ctx) {
        const embed = new EmbedBuilder()
        embed.setColor('DEFAULT')
        embed.addField(ctx.locale('commands:invite.title'), ctx.locale('commands:invite.description', { invite: `https://discord.com/api/oauth2/authorize?client_id=${ctx.client.user.id}&permissions=37047552&scope=bot` }))
        
        ctx.message.author.getDMChannel().then(channel => channel.createMessage(embed.build()).then(() => {
            ctx.quote(ctx.locale('commands:dm.send-dm'))
        }).catch(() => {
            ctx.quote(ctx.locale('commands:dm.dm-closed'))
        }))
    }
}