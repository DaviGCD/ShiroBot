const { Command, EmbedBuilder } = require('../../utils')
module.exports = class PingCommand extends Command {
    constructor() {
        super({
            name: 'ping',
            aliases: ['pang', 'peng', 'ping', 'pong', 'pung'],
            category: 'misc'
        })
    }

    run(ctx) {

        switch (ctx.args[0]) {
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