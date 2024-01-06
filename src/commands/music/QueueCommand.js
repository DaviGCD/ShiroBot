const { Command, Constants, EmbedBuilder } = require('../../utils')
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
    const page = ctx.getArgs('page') ? ctx.getArgs('page')?.value : ctx.args[0]?.replace(/[<@&>]/g, '') || 1
    if (!ctx.client.player.has(ctx.message.guildID)) return ctx.quote(ctx.locale('commands:dj-module.playing-null'))
    if (!ctx.client.player.get(ctx.message.guildID).queue) return ctx.quote(ctx.locale('commands:dj-module.queue-null'))
    let number = 1
    const music = ctx.client.player.get(ctx.message.guildID)
    const queue = Constants.menuItems(music.queue, page, 10)
    const playlist = queue
      .data
      .map(obj => `[**${obj.id}** | ${obj.item.info.title} - (${moment.duration(obj.item.info.length).format('dd:hh:mm:ss')})](${obj.item.info.uri})`)
    const embed = new EmbedBuilder()
    embed.setColor('DEFAULT')
    embed.setDescription(playlist.join('\n'))

    ctx.quote(embed.build())
  }
}