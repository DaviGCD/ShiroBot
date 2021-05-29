const { Command, EmbedBuilder } = require('../../utils')
const YouTube = require('simple-youtube-api')
const youtube = new YouTube('AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8')
const moment = require('moment')
require('moment-duration-format')

module.exports = class SearchCommand extends Command {
  constructor() {
    super({
      name: 'search',
      aliases: ['procurar', 'pesquisar'],
      category: 'music',
      ClientPermission: ['CONNECT', 'SPEAK']
    })
  }

  async run(ctx) {
    if (!ctx.message.member.voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-channel-null'))
    if (ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID && ctx.message.member.voiceState.channelID !== ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-another-channel', { channel: ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID.name }))
    if (!ctx.args[0]) return ctx.quote(ctx.locale('commands:search.args-null'))
    let vdo;
    try {
      const videos = await youtube.searchVideos(ctx.args.join(' '), 10)
      let number = 1
      console.log(videos)
    //   const embed = new EmbedBuilder()
    //     .setColor('DEFAULT')
    //     .setTitle(ctx.locale('commands:search.title'))
    //     .setDescription(videos.map(video => `[**${number++} -** ${video.title} - ${video.channel.title}](${video.url})`).join('\n'))
    //     .setFooter(ctx.locale('commands:search.time'))
    //   ctx.quote(embed)
    //   const response = await ctx.message.channel.awaitMessages(msg => (msg.content > 0 && msg.content < 10) && msg.author.id === ctx.message.author.id, {
    //     max: 1,
    //     time: 20000,
    //     errors: ['time']
    //   })
    //   if (!response) return ctx.quote(ctx.locale('commands:search.invalid'))
    //   const videoIndex = Number(response.first().content)
    //   vdo = await youtube.getVideoByID(videos[videoIndex - 1].id)

    //   if (ctx.client.lavalink.manager.players.has(ctx.message.guildID)) {
    //     ctx.client.player.get(ctx.message.guildID).play(vdo.url).then(info => {
    //       ctx.quote(ctx.locale('commands:play.add-to-queue', {
    //         musicTitle: info.title,
    //         musicAuthor: info.author,
    //         musicTime: moment.duration(info.length).format('dd:hh:mm:ss')
    //       }))
    //     })

    //   } else {
    //     let music = await ctx.client.lavalink.join(ctx.message.member.voiceState.channelID.id)
    //     music.on('playingNow', track => {
    //       ctx.quote(ctx.locale('commands:play.playing-now', {
    //         musicTitle: track.info.title,
    //         musicAuthor: track.info.author,
    //         musicTime: moment.duration(track.info.length).format('dd:hh:mm:ss')
    //       }))
    //     })
    //     music.on('playingEnd', async () => {
    //       await ctx.client.lavalink.manager.leave(ctx.message.guildID)
    //       ctx.client.lavalink.manager.players.delete(ctx.message.guildID)
    //     })
    //     music.play(vdo.title);
    //     ctx.client.player.set(ctx.message.guildID, music)
    //   }
    } catch (error) {
      console.error(error)
      ctx.quote(ctx.locale('commands:search.no-results'))
    }
  }
}