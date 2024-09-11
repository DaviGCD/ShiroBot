const { Command } = require('../../utils')
const parse = require('parse-duration')
module.exports = class SeekCommand extends Command {
  constructor() {
    super({
      name: 'seek',
      aliases: ['posição'],
      category: 'music',
      UserPermission: null,
      ClientPermission: null,
      OnlyDevs: false,
      slash: {
        name: 'seek',
        description: 'Changes the position of the current song.',
        options: [{
          type: 4,
          name: 'position',
          description: 'Only seconds are supported (example: 120)'
        }]
      }
    })
  }

  run(ctx) {
    let role = ctx.message.channel.guild.roles.get(ctx.db.guild.djRole)
    const args = ctx.args !== undefined ? ctx.args[0].value ?? ctx.args[0] : null
    if (!role) {
      if (!ctx.client.player.has(ctx.message.guildID)) return ctx.quote(ctx.locale('commands:dj-module.playing-null'))
      if (!ctx.message.member.voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-channel-null'))
      if (ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID && ctx.message.member.voiceState.channelID !== ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-another-channel', { channel: ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID.name }))
      if (!args) return ctx.quote(ctx.locale('commands:seek.args-null'))

      ctx.client.player.get(ctx.message.guildID).seek(parse(`${args}s`))
      ctx.quote(ctx.locale('commands:seek.seeked'))
    } else {
      if (!ctx.message.member.roles.has(role.id)) return ctx.quote(ctx.locale('permissions:DJ_PERMISSION'))
      if (!ctx.client.player.has(ctx.message.guildID)) return ctx.quote(ctx.locale('commands:dj-module.playing-null'))
      if (!ctx.message.member.voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-channel-null'))
      if (ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID && ctx.message.member.voiceState.channelID !== ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-another-channel', { channel: ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID.name }))
      if (!args) return ctx.quote(ctx.locale('commands:seek.args-null'))

      ctx.client.player.get(ctx.message.guildID).seek(parse(`${args}s`))
      ctx.quote(ctx.locale('commands:seek.seeked'))
    }
  }
}