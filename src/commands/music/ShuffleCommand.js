const Command = require("../../structures/command")
module.exports = class ShuffleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "shuffle",
            aliases: ["embaralhar", "espalhar", "aleatoriar"],
            category: "music"
        })
    }

    run({ message, args, server }, t) {
        let role = message.guild.roles.get(server.djRole)
        if (!role) {
            if (!this.client.player.has(message.guild.id)) return message.channel.send(t("commands:dj-module.playing-null"))
            if (!this.client.player.get(message.guild.id).queue) return message.channel.send(t("commands:dj-module.queue-null"))
            if (!message.member.voice.channel) return message.channel.send(t("commands:dj-module.user-channel-null"))
            if (message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send(t("commands:dj-module.user-another-channel", { channel: message.guild.me.voice.channel.name }))

            this.client.player.get(message.guild.id).shuffle()
            message.channel.send(t("commands:shuffle"))
        } else {
            if (!message.guild.roles.has(role.id)) return message.channel.send(t("permissions:dj-permission"))
            if (!this.client.player.has(message.guild.id)) return message.channel.send(t("commands:dj-module.playing-null"))
            if (!this.client.player.get(message.guild.id).queue) return message.channel.send(t("commands:dj-module.queue-null"))
            if (!message.member.voice.channel) return message.channel.send(t("commands:dj-module.user-channel-null"))
            if (message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send(t("commands:dj-module.user-another-channel", { channel: message.guild.me.voice.channel.name }))

            this.client.player.get(message.guild.id).shuffle()
            message.channel.send(t("commands:shuffle"))
        }
    }
}