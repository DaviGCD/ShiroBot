const { Command } = require('../../utils')
const moment = require('moment')
require('moment-duration-format')
module.exports = class StatsCommand extends Command {
  constructor() {
    super({
      name: 'stats',
      aliases: ['status'],
      category: 'misc',
      slash: {
        name: 'stats',
        description: 'Shows my statistics.'
      }
    })
  }

  run(ctx) {
    const memory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
    const uptime = moment.duration(ctx.client.uptime).format('dd [days] hh [hours] mm [min] ss [secs]')
    const users = ctx.client.users.size
    const servers = ctx.client.guilds.size
    const nodeVersion = process.version
    const discordVersion = require('eris').VERSION
    const lavalink = require('../../../package.json').dependencies['lavacord']
    const shards = `${ctx.message.channel.guild.shard.id}/${ctx.client.shards.size}`
    const stats = `== STATISTICS ==\n\n• ${ctx.locale('commands:stats.memory')} :: ${memory}MB\n• ${ctx.locale('commands:stats.uptime')} :: ${uptime}\n• ${ctx.locale('commands:stats.users')} :: ${users}\n• ${ctx.locale('commands:stats.servers')} :: ${servers}\n• ${ctx.locale('commands:stats.node-version')} :: ${nodeVersion}\n• eris :: ${discordVersion}\n• lavacord :: ${lavalink}\n• ${ctx.locale('commands:stats.shards')} :: ${shards}`

    ctx.quote(`\`\`\`asciidoc\n${stats}\`\`\``)
  }
}