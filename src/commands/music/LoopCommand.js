const { Command } = require('../../utils')
module.exports = class LoopCommand extends Command {
  constructor() {
    super({
      name: 'loop',
      aliases: ['repetir', 'repeat'],
      category: 'music'
    })
  }

  run(ctx) {
    let role = ctx.message.channel.guild.roles.get(ctx.db.guild.djRole)
    if (!role) {
      if (!ctx.client.player.has(ctx.message.guildID)) return ctx.quote(ctx.locale('commands:dj-module.playing-null'))
      if (!ctx.message.member.voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-channel-null'))
      if (ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID && ctx.message.member.voiceState.channelID !== ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-another-channel', { channel: ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID.name }))
      if (ctx.client.player.get(ctx.message.guildID).repeat) {
        ctx.client.player.get(ctx.message.guildID).repeat = false
        ctx.quote(ctx.locale('commands:loop.disable', { music: ctx.client.player.get(ctx.message.guildID).np.title }))
      } else {
        ctx.client.player.get(ctx.message.guildID).repeat = true
        ctx.quote(ctx.locale('commands:loop.enable', { music: ctx.client.player.get(ctx.message.guildID).np.title }))
      }
    } else {
      if (!ctx.message.member.roles.has(role.id)) return ctx.quote(ctx.locale('permissions:DJ_PERMISSION'))
      if (!ctx.client.player.has(ctx.message.guildID)) return ctx.quote(ctx.locale('commands:dj-module.playing-null'))
      if (!ctx.message.member.voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-channel-null'))
      if (ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID && ctx.message.member.voiceState.channelID !== ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-another-channel', { channel: ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID.name }))
      if (ctx.client.player.get(ctx.message.guildID).repeat) {
        ctx.client.player.get(ctx.message.guildID).repeat = false
        ctx.quote(ctx.locale('commands:loop.disable', { music: ctx.client.player.get(ctx.message.guildID).np.title }))
      } else {
        ctx.client.player.get(ctx.message.guildID).repeat = true
        ctx.quote(ctx.locale('commands:loop.enable', { music: ctx.client.player.get(ctx.message.guildID).np.title }))
      }
    }
  }
}