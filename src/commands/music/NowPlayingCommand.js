const { Command, EmbedBuilder } = require('../../utils')
const moment = require('moment')
require('moment-duration-format')

module.exports = class NowPlayingCommand extends Command {
  constructor() {
    super({
      name: 'nowplaying',
      aliases: ['playing', 'np', 'playingnow'],
      category: 'music',
      slash: {
        name: 'nowplaying',
        description: 'Shows the song that is actually playing.'
      }
    })
  }

  run(ctx) {

    if (!ctx.client.player.has(ctx.message.guildID)) return ctx.quote(ctx.locale('commands:dj-module.playing-null'))
    const music = ctx.client.player.get(ctx.message.guildID)
    const embed = new EmbedBuilder()
    embed.setColor('DEFAULT')
    embed.setTitle(ctx.locale('commands:np.now-playing'))
    embed.setURL(music.np.uri)
    embed.setThumbnail(music.np.artworkUrl)
    embed.addField(ctx.locale('commands:np.title'), music.np.title, true)
    embed.addField(ctx.locale('commands:np.channel'), music.np.author, true)
    // embed.addField(ctx.locale('commands:np.requestedBy'), `${music.np.requestedBy.username} (\`${music.np.requestedBy.id}\`)`, true)
    embed.addField(ctx.locale('commands:np.duration'), `[${moment.duration(music.player.state.position).format('dd:hh:mm:ss', { stopTrim: 'm' })}/${moment.duration(music.np.length).format('dd:hh:mm:ss')}]`, true)
    embed.addField(ctx.locale('commands:np.loop'), music.repeat ? ctx.locale('commands:true') : ctx.locale('commands:false'), true)
    embed.addField(ctx.locale('commands:np.link'), `[${ctx.locale('commands:click-here')}](${music.np.uri})`, true)

    ctx.quote(embed.build())
  }
}