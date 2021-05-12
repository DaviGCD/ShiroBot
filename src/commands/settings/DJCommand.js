const { Command, EmbedBuilder } = require('../../utils')
module.exports = class DJCommand extends Command {
  constructor() {
    super({
      name: 'dj',
      aliases: [],
      category: 'settings',
      UserPermission: ['MANAGE_GUILD']
    })
  }

  run(ctx) {
    let role = ctx.message.mentions.roles.first() || ctx.message.channel.guild.roles.get(`${ctx.args[0]}`.replace(/[<@&>]/g))
    if (!role) {
      const embed = new EmbedBuilder()
        .setColor(ctx.client.colors.default)
        .setDescription(ctx.locale('commands:dj-module.dj.args-null', { prefix: ctx.db.guild.prefix }))

      return ctx.quote(embed)
    }


    ctx.db.guild.djRole = role.id
    ctx.db.guild.save()

    ctx.quote(ctx.locale('commands:dj-module.dj.success'))
  }
}