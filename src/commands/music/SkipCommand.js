const Command = require("../../structures/command")
module.exports = class SkipCommand extends Command {
    constructor(client) {
        super(client, {
            name: "skip",
            aliases: ["pular"],
            category: "music",
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false
        })
    }

    run({ message, args, server }, t) {
        let role = message.guild.roles.cache.get(server.djRole)
        if (!message.guild.roles.cache.get(server.djRole)) {
            if (!this.client.player.has(message.guild.id)) return message.channel.send(t("commands:dj-module.playing-null"))
            if (!message.member.voice.channel) return message.channel.send(t("commands:dj-module.user-channel-null"))
            if (message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send(t("commands:dj-module.user-another-channel", { channel: message.guild.me.voice.channel.name }))

            this.client.player.get(message.guild.id).skip()
            message.channel.send(t("commands:skip"))
        } else {
            if (!message.member.roles.has(role.id)) return message.channel.send(t("permissions:dj-permission"))
            if (!this.client.player.has(message.guild.id)) return message.channel.send(t("commands:dj-module.playing-null"))
            if (!message.member.voice.channel) return message.channel.send(t("commands:dj-module.user-channel-null"))
            if (message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send(t("commands:dj-module.user-another-channel", { channel: message.guild.me.voice.channel.name }))

            this.client.player.get(message.guild.id).skip()
            message.channel.send(t("commands:skip"))
        }
    }
}