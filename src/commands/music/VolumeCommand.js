const { Command } = require('../../utils')
module.exports = class VolumeCommand extends Command {
  constructor() {
    super({
      name: 'volume',
      aliases: ['vol'],
      category: 'music',
      UserPermission: null,
      ClientPermission: null,
      OnlyDevs: false
    })
  }

  run(ctx) {
    let role = ctx.message.channel.guild.roles.get(ctx.db.guild.djRole)
    if (!role) {
      if (!ctx.client.player.has(ctx.message.guildID)) return ctx.quote(ctx.locale('commands:dj-module.playing-null'))
      if (!ctx.message.member.voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-channel-null'))
      if (ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID && ctx.message.member.voiceState.channelID !== ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-another-channel', { channel: ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID.name }))
      if (!ctx.args[0]) return ctx.quote(ctx.locale('commands:current', { volume: ctx.client.player.get(ctx.message.guildID).player.state.volume }))
      if (ctx.args[0] > 100 && ctx.args[0] < 5) return ctx.quote(ctx.locale('commands:volume.max-and-min'))

      ctx.client.player.get(ctx.message.guildID).player.volume(ctx.args[0])
      ctx.quote(ctx.locale('commands:volume.changed', { volume: ctx.client.player.get(ctx.message.guildID).player.state.volume }))
    } else {
      if (!ctx.message.member.roles.has(role.id)) return ctx.quote(ctx.locale('permissions:DJ_PERMISSION'))
      if (!ctx.client.player.has(ctx.message.guildID)) return ctx.quote(ctx.locale('commands:dj-module.playing-null'))
      if (!ctx.message.member.voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-channel-null'))
      if (ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID && ctx.message.member.voiceState.channelID !== ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-another-channel', { channel: ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID.name }))
      if (!ctx.args[0]) return ctx.quote(ctx.locale('commands:current', { volume: ctx.client.player.get(ctx.message.guildID).player.state.volume }))
      if (ctx.args[0] > 100 && ctx.args[0] < 5) return ctx.quote(ctx.locale('commands:volume.max-and-min'))

      ctx.client.player.get(ctx.message.guildID).player.volume(ctx.args[0])
      ctx.quote(ctx.locale('commands:volume.changed', { volume: ctx.client.player.get(ctx.message.guildID).player.state.volume }))
    }
  }
}