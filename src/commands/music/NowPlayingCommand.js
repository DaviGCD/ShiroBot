const { Command, EmbedBuilder } = require('../../utils')
const moment = require('moment')
require('moment-duration-format')

module.exports = class NowPlayingCommand extends Command {
  constructor() {
    super({
      name: 'nowplaying',
      aliases: ['playing', 'np', 'playingnow'],
      category: 'music'
    })
  }

  run(ctx) {

    if (!ctx.client.player.has(ctx.message.guildID)) return ctx.quote(ctx.locale('commands:dj-module.playing-null'))
    const music = ctx.client.player.get(ctx.message.guildID)
    const embed = new EmbedBuilder()
    embed.setColor('DEFAULT')
    embed.setTitle(ctx.locale('commands:np.now-playing'))
    embed.setURL(`https://youtu.be/${music.np.identifier}`)
    embed.setThumbnail(`https://i.ytimg.com/vi/${music.np.identifier}/maxresdefault.jpg`)
    embed.addField(ctx.locale('commands:np.title'), music.np.title)
    embed.addField(ctx.locale('commands:np.channel'), music.np.author)
    embed.addField(ctx.locale('commands:np.requestedBy'), `${music.np.requestedBy.username}#${music.np.requestedBy.discriminator} (\`${music.np.requestedBy.id}\`)`)
    embed.addField(ctx.locale('commands:np.duration'), `[${moment.duration(music.player.state.position).format('dd:hh:mm:ss', { stopTrim: 'm' })}/${moment.duration(music.np.length).format('dd:hh:mm:ss')}]`)
    embed.addField(ctx.locale('commands:np.loop'), music.repeat ? ctx.locale('commands:true') : ctx.locale('commands:false'))
    embed.addField(ctx.locale('commands:np.link'), `[${ctx.locale('commands:click-here')}](${music.np.uri})`)

    ctx.quote(embed.build())
  }
}