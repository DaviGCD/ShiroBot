const Command = require("../../structures/command")
const moment = require('moment')
require('moment-duration-format')
module.exports = class StatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: "stats",
            aliases: ["status"],
            category: "misc"
        })
    }

    run({ message, args, server }, t) {
        let memory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
        let uptime = moment.duration(this.client.uptime).format('dd [days] hh [hours] mm [min] ss [secs]')
        let users = this.client.users.cache.size
        let servers = this.client.guilds.cache.size
        let channels = this.client.channels.cache.size
        let nodeVersion = process.version
        let discordVersion = require("discord.js").version
        let lavalink = require("discord.js-lavalink").version
        let shards = `${this.client.shard.ids}/${this.client.shard.count}`
        let stats = `== STATISTICS ==\n\n• ${t("commands:stats.memory")} :: ${memory}MB\n• ${t("commands:stats.uptime")} :: ${uptime}\n• ${t("commands:stats.users")} :: ${users}\n• ${t("commands:stats.servers")} :: ${servers}\n• ${t("commands:stats.channels")} :: ${channels}\n• ${t("commands:stats.node-version")} :: ${nodeVersion}\n• ${t("commands:stats.discord-version")} :: ${discordVersion}\n• ${t("commands:stats.lavalink")} :: ${lavalink}\n• ${t("commands:stats.shards")} :: ${shards}`

        message.channel.send(stats, { code: "asciidoc" })
    }
}