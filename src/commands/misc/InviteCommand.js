const { Command, EmbedBuilder } = require('../../utils')
module.exports = class InviteCommand extends Command {
  constructor() {
    super({
      name: 'invite',
      aliases: ['convite', 'convidar', 'adicionar'],
      category: 'misc',
      UserPermission: null,
      ClientPermission: null,
      OnlyDevs: false,
      slash: {
        name: 'invite',
        description: 'Sends my invite in your private.'
      }
    })
  }

  run(ctx) {
    const embed = new EmbedBuilder()
    embed.setColor('DEFAULT')
    embed.addField(ctx.locale('commands:invite.title'), ctx.locale('commands:invite.description', { invite: this.generateInvite(ctx.client, 3694521470) }))

    ctx.message.member.user.getDMChannel().then(channel => channel.createMessage(embed.build()).then(() => {
      ctx.quote(ctx.locale('commands:dm.send-dm'))
    }).catch(() => {
      ctx.quote(ctx.locale('commands:dm.dm-closed'))
    }))
  }

  generateInvite(client, permissions) {
    return `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot%20applications.commands&permissions=${permissions}`
  }
}