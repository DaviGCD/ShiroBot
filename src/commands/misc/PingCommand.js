const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            aliases: ["pang", "peng", "ping", "pong", "pung"],
            category: "misc",
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false
        })
    }

    run({ message, args, server }, t) {

        switch (args[0]) {
            case "shards":
                this.client.shard.broadcastEval('this.ping').then(shard => {
                    const embed = new MessageEmbed()
                        .setColor(this.client.colors.default)
                    let s = []
                    shard.forEach((ping, index) => s.push(embed.addField(`Shard ${index}`, `${Math.round(ping)}ms`)))
                    message.channel.send(embed)
                })
                break;
            default:
                message.channel.send(`:ping_pong: ${this.client.ws.ping}ms (Shard: ${this.client.shard.ids}/${this.client.shard.count})`)
        }
    }
}