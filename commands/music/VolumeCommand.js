const Command = require("../../src/structures/command")
module.exports = class VolumeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "volume",
            aliases: ["vol"],
            category: "music",
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false
        })
    }

    run({message, args, server}, t) {
        let role = message.guild.roles.get(server.djRole)
        if (!role) {
            if (!this.client.player.has(message.guild.id)) return message.channel.send(t("commands:dj-module.playing-null"))
            if (!message.member.voice.channel) return message.channel.send(t("commands:dj-module.user-channel-null"))
            if (message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send(t("commands:dj-module.user-another-channel", {channel: message.guild.me.voice.channel.name}))
            if (!args[0]) return message.channel.send(t("commands:current", {volume: this.client.player.get(message.guild.id).player.state.volume}))
            if (args[0] > 100 && args[0] < 5) return message.channel.send(t("commands:volume.max-and-min", {volume: this.client.player.get(message.guild.id).player.state.volume}))

            this.client.player.get(message.guild.id).player.volume(args[0])
            message.channel.send(t("commands:volume.changed", {volume: this.client.player.get(message.guild.id).player.state.volume}))
        } else {
            if (!message.member.roles.has(role.id)) return message.channel.send(t("permissions:dj-permission"))
            if (!this.client.player.has(message.guild.id)) return message.channel.send(t("commands:dj-module.playing-null"))
            if (!message.member.voice.channel) return message.channel.send(t("commands:dj-module.user-channel-null"))
            if (message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send(t("commands:dj-module.user-another-channel", {channel: message.guild.me.voice.channel.name}))
            if (!args[0]) return message.channel.send(t("commands:current", {volume: this.client.player.get(message.guild.id).player.state.volume}))
            if (args[0] > 100 && args[0] < 5) return message.channel.send(t("commands:volume.max-and-min", {volume: this.client.player.get(message.guild.id).player.state.volume}))

            this.client.player.get(message.guild.id).player.volume(args[0])
            message.channel.send(t("commands:volume.changed", {volume: this.client.player.get(message.guild.id).player.state.volume}))
        }
    }
}