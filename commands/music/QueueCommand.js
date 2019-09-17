const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
require("moment-duration-format")
module.exports = class QueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: "playlist",
            aliases: ["queue", "lista", "list"],
            category: "music"
        })
    }

    run({message, args, server}, t) {
        
        if (!this.client.player.has(message.guild.id)) return message.channel.send(t("commands:dj-module.playing-null"))
        if (!this.client.player.get(message.guild.id).queue) return message.channel.send(t("commands:dj-module.queue-null"))
        let number = 1
        const music = this.client.player.get(message.guild.id)
        let music_info = music.queue.map(video => `[**${number++}** | ${video.info.title} - (${moment.duration(video.info.length).format("dd:hh:mm:ss")})](${video.info.uri})`)
        const embed = new MessageEmbed()
        .setColor(this.client.colors.default)
        .setDescription(music_info)

        message.channel.send(embed)
    }
}