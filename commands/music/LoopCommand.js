const Command = require("../../src/structures/command")
module.exports = class LoopCommand extends Command {
    constructor(client) {
        super(client, {
            name: "loop",
            aliases: ["repetir", "repeat"],
            category: "music"
        })
    }

    run({message, args, server}, t) {
        let role = message.guild.roles.get(server.djRole)
        if (!role) {
            if (!this.client.player.has(message.guild.id)) return message.channel.send(t("commands:dj-module.playing-null"))
            if (!message.member.voice.channel) return message.channel.send(t("commands:dj-module.user-channel-null"))
            if (message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send(t("commands:dj-module.user-another-channel", {channel: message.guild.me.voice.channel.name}))
            if (this.client.player.get(message.guild.id).repeat) {
                this.client.player.get(message.guild.id).repeat = false
                message.channel.send(t("commands:loop.disable"))
            } else {
                this.client.player.get(message.guild.id).repeat = true
                message.channel.send(t("commands:loop.enable"))
            }
        } else {
            if (!message.member.roles.has(role.id)) return message.channel.send(t("permissions:dj-permission"))
            if (!this.client.player.has(message.guild.id)) return message.channel.send(t("commands:dj-module.playing-null"))
            if (!message.member.voice.channel) return message.channel.send(t("commands:dj-module.user-channel-null"))
            if (message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send(t("commands:dj-module.user-another-channel", {channel: message.guild.me.voice.channel.name}))
            if (this.client.player.get(message.guild.id).repeat) {
                this.client.player.get(message.guild.id).repeat = false
                message.channel.send(t("commands:loop.disable"))
            } else {
                this.client.player.get(message.guild.id).repeat = true
                message.channel.send(t("commands:loop.enable"))
            }
        }
    }
}