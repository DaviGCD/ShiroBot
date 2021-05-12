const { Command } = require('../../utils')
module.exports = class PrefixCommand extends Command {
    constructor() {
        super({
            name: 'prefix',
            aliases: [],
            category: 'settings',
            UserPermission: ['MANAGE_GUILD'],
            ClientPermission: null,
            OnlyDevs: false
        })
    }

    run(ctx) {
        if (!ctx.args[0]) return ctx.quote(ctx.locale('commands:prefix.args-null'))

        ctx.db.guild.prefix = ctx.args[0]
        ctx.db.guild.save()

        ctx.quote(ctx.locale('commands:prefix.success'))
    }
}