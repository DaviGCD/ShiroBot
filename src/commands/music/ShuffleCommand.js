const { Command } = require('../../utils')
module.exports = class ShuffleCommand extends Command {
  constructor() {
    super({
      name: 'shuffle',
      aliases: ['embaralhar', 'espalhar', 'aleatoriar'],
      category: 'music',
      slash: {
        name: 'shuffle',
        description: 'Shuffles the musics that is on the queue.'
      }
    })
  }

  run(ctx) {
    let role = ctx.message.channel.guild.roles.get(ctx.db.guild.djRole)
    if (!role) {
      if (!ctx.client.player.has(ctx.message.guildID)) return ctx.quote(ctx.locale('commands:dj-module.playing-null'))
      if (!ctx.client.player.get(ctx.message.guildID).queue) return ctx.quote(ctx.locale('commands:dj-module.queue-null'))
      if (!ctx.message.member.voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-channel-null'))
      if (ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID && ctx.message.member.voiceState.channelID !== ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-another-channel', { channel: ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID.name }))

      ctx.client.player.get(ctx.message.guildID).shuffle()
      ctx.quote(ctx.locale('commands:shuffle'))
    } else {
      if (!ctx.message.guild.roles.has(role.id)) return ctx.quote(ctx.locale('permissions:DJ_PERMISSION'))
      if (!ctx.client.player.has(ctx.message.guildID)) return ctx.quote(ctx.locale('commands:dj-module.playing-null'))
      if (!ctx.client.player.get(ctx.message.guildID).queue) return ctx.quote(ctx.locale('commands:dj-module.queue-null'))
      if (!ctx.message.member.voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-channel-null'))
      if (ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID && ctx.message.member.voiceState.channelID !== ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-another-channel', { channel: ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID.name }))

      ctx.client.player.get(ctx.message.guildID).shuffle()
      ctx.quote(ctx.locale('commands:shuffle'))
    }
  }
}