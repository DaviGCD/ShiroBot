const { Command, EmbedBuilder } = require('../../utils')
module.exports = class DJCommand extends Command {
  constructor() {
    super({
      name: 'dj',
      aliases: [],
      category: 'settings',
      UserPermission: ['MANAGE_GUILD'],
      slash: {
        name: 'dj',
        description: 'Sets up my DJ module.',
        options: [{
          type: 8,
          name: 'role',
          description: 'The allowed to use the DJ commands',
          required: false
        }]
      }
    })
  }

  run(ctx) {
    const role = ctx.getArgs('role') ? ctx.getArgs('role')?.value : ctx.args[0]?.replace(/[<@&>]/g, '')
    if (!role) {
      if (!ctx.db.guild.dj_module.role) {
         const embed = new EmbedBuilder()
        embed.setColor('DEFAULT')
        embed.setDescription(ctx.locale('commands:dj-module.dj.args-null', { prefix: ctx.db.guild.prefix }))
        return ctx.quote(embed.build())
      }
      ctx.db.guild.dj_module = {
        role: '',
        channel: ctx.db.guild.dj_module.channel,
        auto_play: ctx.db.guild.dj_module.auto_play
      }
      ctx.db.guild.save().then(() => {
        ctx.quoteT('commands:dj-module.disabled')
      })
      return
    }
    ctx.db.guild.dj_module = {
      role: String(role),
      channel: ctx.db.guild.dj_module.channel,
      auto_play: ctx.db.guild.dj_module.auto_play
    }
    ctx.db.guild.save().then((it) => {
      ctx.quote(ctx.locale('commands:dj-module.dj.success'))
    })
  }
}