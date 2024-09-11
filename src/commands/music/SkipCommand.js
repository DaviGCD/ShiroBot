const { Command } = require('../../utils')
module.exports = class SkipCommand extends Command {
  constructor() {
    super({
      name: 'skip',
      aliases: ['pular'],
      category: 'music',
      UserPermission: null,
      ClientPermission: null,
      OnlyDevs: false,
      slash: {
        name: 'skip',
        description: 'Skips the current song for the next song in the queue.'
      }
    })
  }

  run(ctx) {
    let role = ctx.message.channel.guild.roles.get(ctx.db.guild.djRole)
    if (!ctx.message.channel.guild.roles.get(ctx.db.guild.djRole)) {
      if (!ctx.client.player.has(ctx.message.guildID)) return ctx.quote(ctx.locale('commands:dj-module.playing-null'))
      if (!ctx.message.member.voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-channel-null'))
      if (ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID && ctx.message.member.voiceState.channelID !== ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-another-channel', { channel: ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID.name }))

      ctx.client.player.get(ctx.message.guildID).skip(ctx.message.author)
      ctx.quote(ctx.locale('commands:skip'))
    } else {
      if (!ctx.message.member.roles.has(role.id)) return ctx.quote(ctx.locale('permissions:DJ_PERMISSION'))
      if (!ctx.client.player.has(ctx.message.guildID)) return ctx.quote(ctx.locale('commands:dj-module.playing-null'))
      if (!ctx.message.member.voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-channel-null'))
      if (ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID && ctx.message.member.voiceState.channelID !== ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-another-channel', { channel: ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID.name }))

      ctx.client.player.get(ctx.message.guildID).skip(ctx.message.author)
      ctx.quote(ctx.locale('commands:skip'))
    }
  }
}