const Command = require("../../structures/command")
const parse = require("parse-duration")
module.exports = class StopCommand extends Command {
    constructor(client) {
        super(client, {
            name: "stop",
            aliases: ["parar", "leave", "sair"],
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

            this.client.player.get(message.guild.id).player.stop()
            this.client.player.delete(message.guild.id)
            message.channel.send(t("commands:stop", { channel: message.guild.me.voice.channel.name }))
            this.client.lavalink.manager.leave(message.guild.id)
            this.client.lavalink.manager.players.delete(message.guild.id)
        } else {
            if (!message.member.roles.has(role.id)) return message.channel.send(t("permissions:dj-permission"))
            if (!this.client.player.has(message.guild.id)) return message.channel.send(t("commands:dj-module.playing-null"))
            if (!message.member.voice.channel) return message.channel.send(t("commands:dj-module.user-channel-null"))
            if (message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send(t("commands:dj-module.user-another-channel", { channel: message.guild.me.voice.channel.name }))

            this.client.player.get(message.guild.id).player.stop()
            this.client.player.delete(message.guild.id)
            message.channel.send(t("commands:stop", { channel: message.guild.me.voice.channel.name }))
            this.client.lavalink.manager.leave(message.guild.id)
            this.client.lavalink.manager.players.delete(message.guild.id)
        }
    }
}