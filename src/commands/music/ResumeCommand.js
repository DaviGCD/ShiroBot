const { Command } = require('../../utils')
module.exports = class ResumeCommand extends Command {
  constructor() {
    super({
      name: 'resume',
      aliases: ['retomar', 'despausar', 'unpause'],
      category: 'music',
      UserPermission: null,
      ClientPermission: null,
      OnlyDevs: false,
      slash: {
        name: 'resume',
        description: 'Resumes the song that is paused.'
      }
    })
  }

  run(ctx) {
    let role = ctx.message.channel.guild.roles.get(ctx.db.guild.djRole)
    if (!role) {
      if (!ctx.client.player.has(ctx.message.guildID)) return ctx.quote(ctx.locale('commands:dj-module.playing-null'))
      if (!ctx.message.member.voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-channel-null'))
      if (ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID && ctx.message.member.voiceState.channelID !== ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-another-channel', { channel: ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID.name }))
      if (!ctx.client.player.get(ctx.message.guildID).player.paused) return ctx.quote(ctx.locale('commands:resume.paused'))

      ctx.client.player.get(ctx.message.guildID).player.resume()
      ctx.quote(ctx.locale('commands:resume.resumed'))
    } else {
      if (!ctx.message.member.roles.has(role.id)) return ctx.quote(ctx.locale('permissions:DJ_PERMISSION'))
      if (!ctx.client.player.has(ctx.message.guildID)) return ctx.quote(ctx.locale('commands:dj-module.playing-null'))
      if (!ctx.message.member.voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-channel-null'))
      if (ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID && ctx.message.member.voiceState.channelID !== ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-another-channel', { channel: ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID.name }))
      if (!ctx.client.player.get(ctx.message.guildID).player.paused) return ctx.quote(ctx.locale('commands:resume.paused'))

      ctx.client.player.get(ctx.message.guildID).player.resume()
      ctx.quote(ctx.locale('commands:resume.resumed'))
    }
  }
}