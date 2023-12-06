const { Command, EmbedBuilder } = require('../../utils')
module.exports = class PingCommand extends Command {
  constructor() {
    super({
      name: 'ping',
      aliases: ['pang', 'peng', 'ping', 'pong', 'pung'],
      category: 'misc',
      slash: {
      	name: 'ping',
	      description: 'Shows my current ping',
	      options: [{type: 5, name: 'shards', description: 'See how many shards I have', required: false}]
      }
    })
  }

  run(ctx) {
    const args = ctx.args !== undefined ? ctx.args[0]?.name ?? ctx.args[0] : null
    switch (args) {
      case 'shards':
        const shards = ctx.client.shards
        const s = []
        const embed = new EmbedBuilder()
        embed.setColor('DEFAULT')
        shards.forEach((shard, index) => {
          s.push(embed.addField(`Shard ${index}`, `${Math.round(shard.latency)}ms`))
        })
        ctx.quote(embed.build())
        break;
      default:
        ctx.quote(`:ping_pong: ${ctx.message.channel.guild.shard.latency}ms (Shard: ${ctx.message.channel.guild.shard.id}/${ctx.client.shards.size})`)
    }
  }
}