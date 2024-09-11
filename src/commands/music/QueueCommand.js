const { Command, Constants, EmbedBuilder } = require('../../utils')
const moment = require('moment')
require('moment-duration-format')
module.exports = class QueueCommand extends Command {
  constructor() {
    super({
      name: 'queue',
      aliases: ['playlist', 'lista', 'list'],
      category: 'music',
      slash: {
        name: 'queue',
        description: 'Shows the queue of the current player.',
        options: [{
          type: 4,
          name: 'page',
          description: 'The page that you want to see',
          required: false
        }]
      }
    })
  }

  run(ctx) {
    const page = ctx.args !== undefined ? ctx.args[0].value ?? ctx.args[0] : 1
    if (!ctx.client.player.has(ctx.message.guildID)) return ctx.quote(ctx.locale('commands:dj-module.playing-null'))
    if (!ctx.client.player.get(ctx.message.guildID).queue) return ctx.quote(ctx.locale('commands:dj-module.queue-null'))
    const music = ctx.client.player.get(ctx.message.guildID)
    const queue = Constants.menuItems(music.queue, page, 10)
    if (page > queue.total_pages) return ctx.quoteT('commands:queue.limit_exceeded', { pages: queue.total_pages })
    const playlist = queue
      .data
      .map(obj => `[**${obj.id}** | ${obj.item.info.title} - (${moment.duration(obj.item.info.length).format('dd:hh:mm:ss')})](${obj.item.info.uri})`)
    const embed = new EmbedBuilder()
    embed.setColor('DEFAULT')
    embed.setTitle(ctx.locale('commands:queue.title'))
    embed.setDescription(playlist.join('\n'))
    embed.setFooter(ctx.locale('commands:queue.pages'))

    ctx.quote(embed.build())
  }
}