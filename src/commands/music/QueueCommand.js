const { Command, EmbedBuilder } = require('../../utils')
const moment = require('moment')
require('moment-duration-format')
module.exports = class QueueCommand extends Command {
  constructor() {
    super({
      name: 'playlist',
      aliases: ['queue', 'lista', 'list'],
      category: 'music'
    })
  }

  run(ctx) {

    if (!ctx.client.player.has(ctx.message.guildID)) return ctx.quote(ctx.locale('commands:dj-module.playing-null'))
    if (!ctx.client.player.get(ctx.message.guildID).queue) return ctx.quote(ctx.locale('commands:dj-module.queue-null'))
    let number = 1
    const music = ctx.client.player.get(ctx.message.guildID)
    let music_info = music.queue.map(video => `[**${number++}** | ${video.info.title} - (${moment.duration(video.info.length).format('dd:hh:mm:ss')})](${video.info.uri})`)
    const embed = new EmbedBuilder()
    embed.setColor('DEFAULT')
    embed.setDescription(music_info.join('\n'))

    ctx.quote(embed.build())
  }
}