const { Command } = require('../../utils')
const moment = require('moment')
require('moment-duration-format')
module.exports = class PlayCommand extends Command {
  constructor() {
    super({
      name: 'play',
      aliases: ['tocar'],
      category: 'music',
      UserPermission: null,
      ClientPermission: ['CONNECT', 'SPEAK', 'USE_VAD'],
      OnlyDevs: false
    })
  }

  async run(ctx) {
    if (!ctx.message.member.voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-channel-null'))
    if (ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID
      && ctx.message.member.voiceState.channelID !== ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-another-channel', { channel: ctx.client.getChannel(ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID).name }))
    if (!ctx.args[0]) return ctx.quote(ctx.locale('commands:play.args-null'))

    if (ctx.client.lavalink.manager.players.has(ctx.message.guildID)) {
      ctx.client.player.get(ctx.message.guildID).play(ctx.args.join(' '), ctx.message.author).then(info => {
        ctx.quote(ctx.locale('commands:play.add-to-queue', {
          musicTitle: info.title,
          musicAuthor: info.author,
          musicTime: moment.duration(info.length).format('dd:hh:mm:ss')
        }))
      })

    } else {
      let music = await ctx.client.lavalink.join(ctx.message.member.voiceState.channelID)
      music.on('playNow', track => {
        ctx.quote(ctx.locale('commands:play.playing-now', {
          musicTitle: track.info.title,
          musicAuthor: track.info.author,
          musicTime: moment.duration(track.info.length).format('dd:hh:mm:ss')
        }))
      })
      music.on('playEnd', async () => {
        await ctx.client.lavalink.manager.leave(ctx.message.guildID)
        ctx.client.lavalink.manager.players.delete(ctx.message.guildID)
      })
      music.play(ctx.args.join(' '), ctx.message.author)
      ctx.client.player.set(ctx.message.guildID, music)
    }
  }
}