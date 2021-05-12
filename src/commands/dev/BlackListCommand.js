const { Command } = require('../../utils')
module.exports = class BlackListCommand extends Command {
    constructor() {
        super({
            name: 'blacklist',
            aliases: ['listanegra'],
            category: 'dev',
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: true
        })
    }

    async run(ctx) {
        let member = ctx.client.users.get(ctx.args[1])
        let user = await ctx.client.database.users.getOrCreate(member.id)
        if (!ctx.args.slice(2).join(' ')) {
            ctx.args.slice(2).join(' ') === ''
        }
        switch (ctx.args[0]) {
            case 'add':
                if (!member) return ctx.quote(ctx.locale('commands:blacklist.member-ctx.args-null'))
                user.blacklist = true
                user.blacklistreason = ctx.args.slice(2).join(' ')
                user.save()
                ctx.quote(ctx.locale('commands:blacklist.banned'))
                break;
            case 'remove':
                if (!member) return ctx.quote(ctx.locale('commands:blacklist.member-ctx.args-null'))
                user.blacklist = false
                user.blacklistreason = ''
                user.save()
                ctx.quote(ctx.locale('commands:blacklist.unbanned'))
                break;
            case 'view':
                if (!member) return ctx.quote(ctx.locale('commands:blacklist.member-ctx.args-null'))
                let msg = `== USER BANNED INFO ==\n\n• User :: ${ctx.client.users.get(user._id).tag} - (${ctx.client.users.get(user._id).id})\n• Banned :: ${user.blacklist}\n• Reason :: ${user.blacklistreason}`
                ctx.quote(msg, { code: 'asciidoc' })
                break;
            default:
                ctx.quote('Use `add` `remove` `view`')
        }
    }
}