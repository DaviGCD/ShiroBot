const { Command, EmbedBuilder } = require('../../utils')
module.exports = class HelpCommand extends Command {
  constructor() {
    super({
      name: 'help',
      aliases: ['ajuda', 'comandos', 'commands'],
      category: 'misc',
      slash: { name: 'help', description: 'Send this list here in your private.' }
    })
  }

  async run(ctx) {
    const music = ctx.client.commands.filter(cmd => cmd.config.category === 'music').map(cmd => `**${ctx.db.guild.prefix}${cmd.config.name}** » ${ctx.locale(`help:${cmd.config.name}`)}`).join('\n')
    const misc = ctx.client.commands.filter(cmd => cmd.config.category === 'misc').map(cmd => `**${ctx.db.guild.prefix}${cmd.config.name}** » ${ctx.locale(`help:${cmd.config.name}`)}`).join('\n')
    const settings = ctx.client.commands.filter(cmd => cmd.config.category === 'settings').map(cmd => `**${ctx.db.guild.prefix}${cmd.config.name}** » ${ctx.locale(`help:${cmd.config.name}`)}`).join('\n')
    const i = this.generateInvite(ctx.client, 3694521470)
    const links = `[${ctx.locale('commands:invite.title')}](${i}) - [${ctx.locale('commands:support-server')}](https://discord.gg/c8EWvFK)\n[Discord Bot List](https://discordbots.org/bot/481289027753082890/vote)`
    const embed = new EmbedBuilder()
    embed.setColor('DEFAULT')
    embed.setFooter(ctx.locale('commands:help.total-command', { cmd: ctx.client.commands.size }))
    embed.addField(ctx.locale('commands:help.music'), music)
    embed.addField(ctx.locale('commands:help.misc'), misc)
    embed.addField(ctx.locale('commands:help.settings'), settings)
    embed.addBlankField()
    embed.addField(ctx.locale('commands:help.another-links'), `**${links}**`)

    try {
      const channel = await ctx.message.member.user.getDMChannel()
      await channel.createMessage(embed.build())
      ctx.quote(ctx.locale('commands:dm.send-dm'))
    } catch {
      ctx.quote(ctx.locale('commands:dm.dm-closed'))
    }
  }

  generateInvite(client, permissions) {
    return `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot%20applications.commands&permissions=${permissions}`
  }
}