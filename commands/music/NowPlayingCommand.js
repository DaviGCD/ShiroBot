const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
const youtube = require("youtube-info")
const moment = require("moment")
require("moment-duration-format")
module.exports = class NowPlayingCommand extends Command {
    constructor(client) {
        super(client, {
            name: "nowplaying",
            aliases: ["playing", "np", "playingnow"],
            category: "music"
        })
    }

    run({message, args, server}, t) {
        
        if (!this.client.player.has(message.guild.id)) return message.channel.send(t("commands:dj-module.playing-null"))
        const music = this.client.player.get(message.guild.id)
        youtube(music.nowPlaying.identifier, function (err, info) {
            const embed = new MessageEmbed()
            .setColor('#b200ff')
            .setTitle(t("commands:np.now-playing"))
            .setUrl(`https://youtu.be/${music.nowPlaying.identifier}`)
            .setThumbnail(info.thumbnailUrl)
            .addField(t("commands:np.title"), info.title, true)
            .addField(t("commands:np.channel"), info.owner, true)
            .addField(t("commands:np.views"), info.views, true)
            .addField(t("commands:np.like"), info.likeCount, true)
            .addField(t("commands:np.dislike"), info.dislikeCount, true)
            .addField(t("commands:np.comments"), info.commentCount, true)
            .addField(t("commands:np.duration"), `[${moment.duration(music.player.state.position).format('dd:hh:mm:ss')}/${moment.duration(music.nowPlaying.length).format('dd:hh:mm:ss')}]`, true)
            .addField(t("commands:np.link"), info.url, true)

            message.channel.send(embed)
        })
    }
}