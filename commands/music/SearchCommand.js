const Command = require("../../src/structures/command")
const YouTube = require("simple-youtube-api")
const youtube = new YouTube("AIzaSyAfEYgTf8XmbPe8mBz9baavfpPG0n5jTnI")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
require("moment-duration-format")

module.exports = class SearchCommand extends Command {
    constructor(client) {
        super(client, {
            name: "search",
            aliases: ["procurar", "pesquisar"],
            category: "music",
            ClientPermission: ["CONNECT", "SPEAK"]
        })
    }

    async run({message, args, server}, t) {
        if (!message.member.voice.channel) return message.channel.send(t("commands:dj-module.user-channel-null"))
        if (message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send(t("commands:dj-module.user-another-channel", {channel: message.guild.me.voice.channel.name}))
        if (!args[0]) return message.channel.send(t("commands:search.args-null"))
        let vdo;
        try {
            const videos = await youtube.searchVideos(args.join(" "), 10)
            let number = 1
            const embed = new MessageEmbed()
            .setColor(this.client.colors.default)
            .setTitle(t("commands:search.title"))
            .setDescription(videos.map(video => `[**${number++} -** ${video.title} - ${video.channel.title}](${video.url})`).join("\n"))
            .setFooter(t("commands:search.time"))
            message.channel.send(embed)
            const response = await message.channel.awaitMessages(msg => (msg.content > 0 && msg.content < 10) && msg.author.id === message.author.id, {
                max: 1,
                time: 20000,
                errors: ["time"]
            })
            if (!response) return message.channel.send(t("commands:search.invalid"))
            const videoIndex = Number(response.first().content)
            vdo = await youtube.getVideoByID(videos[videoIndex - 1].id)

            if (this.client.lavalink.manager.has(message.guild.id)) {
                this.client.player.get(message.guild.id).play(vdo.url).then(info => {
                    message.channel.send(t("commands:play.add-to-queue", {
                        musicTitle: info.title,
                        musicAuthor: info.author,
                        musicTime: moment.duration(info.length).format('dd:hh:mm:ss')
                    }))
                })
                
            } else {
                let music = await this.client.lavalink.join(message.member.voice.channel.id)
                music.on('playingNow', track => {
                    message.channel.send(t("commands:play.playing-now", {
                        musicTitle: track.info.title,
                        musicAuthor: track.info.author,
                        musicTime: moment.duration(track.info.length).format('dd:hh:mm:ss')
                    }))
                })
                music.on("playingEnd", async () => {
                    await this.client.lavalink.manager.leave(message.guild.id)
                    this.client.lavalink.manager.delete(message.guild.id)
                })
                music.play(vdo.url);
                this.client.player.set(message.guild.id, music)
            }
        } catch (error) {
            console.error(error)
            message.channel.send(t("commands:search.no-results"))
        }
    }
}