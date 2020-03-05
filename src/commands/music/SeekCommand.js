const Command = require("../../structures/command")
const parse = require("parse-duration")
module.exports = class SeekCommand extends Command {
    constructor(client) {
        super(client, {
            name: "seek",
            aliases: ["posição"],
            category: "music",
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false
        })
    }

    run({ message, args, server }, t) {
        let role = message.guild.roles.cache.get(server.djRole)
        if (!role) {
            if (!this.client.player.has(message.guild.id)) return message.channel.send(t("commands:dj-module.playing-null"))
            if (!message.member.voice.channel) return message.channel.send(t("commands:dj-module.user-channel-null"))
            if (message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send(t("commands:dj-module.user-another-channel", { channel: message.guild.me.voice.channel.name }))
            if (!args[0]) return message.channel.send(t("commands:seek.args-null"))

            this.client.player.get(message.guild.id).seek(parse(`${args[0]}s`))
            message.channel.send(t("commands:seek.seeked"))
        } else {
            if (!message.member.roles.has(role.id)) return message.channel.send(t("permissions:dj-permission"))
            if (!this.client.player.has(message.guild.id)) return message.channel.send(t("commands:dj-module.playing-null"))
            if (!message.member.voice.channel) return message.channel.send(t("commands:dj-module.user-channel-null"))
            if (message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send(t("commands:dj-module.user-another-channel", { channel: message.guild.me.voice.channel.name }))
            if (!args[0]) return message.channel.send(t("commands:seek.args-null"))

            this.client.player.get(message.guild.id).seek(parse(`${args[0]}s`))
            message.channel.send(t("commands:seek.seeked"))
        }
    }
}