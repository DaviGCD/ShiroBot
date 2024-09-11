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
      OnlyDevs: false,
      slash: {
        name: 'play',
        description: 'Makes me join in a voice channel and play a music.',
        options: [{
          type: 3,
          name: 'song',
          description: 'Type the name of the song that you desire to play.',
          required: true
        }]
      }
    })
  }

  async run(ctx) {
    const args = ctx.args !== undefined ? ctx.args[0].value ?? ctx.args.join(' ') : null
    if (!ctx.message.member.voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-channel-null'))
    if (ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID
      && ctx.message.member.voiceState.channelID !== ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-another-channel', { channel: ctx.client.getChannel(ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID).name }))
    if (!args) return ctx.quote(ctx.locale('commands:play.args-null'))
    if (ctx.client.lavalink.manager.players.has(ctx.message.guildID)) {
      ctx.client.player.get(ctx.message.guildID).play(args, ctx.message.author).then(info => {
        ctx.quote(ctx.locale('commands:play.add-to-queue', {
          musicTitle: info?.title ?? '[PRIVATE]',
          musicAuthor: info?.author ?? '[PRIVATE]',
          musicTime: moment.duration(info.length).format('dd:hh:mm:ss')
        }))
      })

    } else {
      let music = await ctx.client.lavalink.join(ctx.message.member.voiceState.channelID)
      music.on('nowPlaying', track => {
        ctx.quote(ctx.locale('commands:play.playing-now', {
          musicTitle: track.info.title,
          musicAuthor: track.info.author,
          musicTime: moment.duration(track.info?.length).format('dd:hh:mm:ss')
        }))
      })
      music.on('playerEnded', async () => {
        await ctx.client.lavalink.manager.leave(ctx.message.guildID)
        ctx.client.lavalink.manager.players.delete(ctx.message.guildID)
      })
      music.play(args, ctx.message.author)
      ctx.client.player.set(ctx.message.guildID, music)
    }
  }
}