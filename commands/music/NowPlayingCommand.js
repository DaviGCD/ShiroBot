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
            embed.setColor('#b200ff')
            embed.setTitle(t("commands:np.now-playing"))
            embed.setURL(`https://youtu.be/${music.nowPlaying.identifier}`)
            embed.setThumbnail(info.thumbnailUrl)
            embed.addField(t("commands:np.title"), info.title, true)
            embed.addField(t("commands:np.channel"), info.owner, true)
            embed.addField(t("commands:np.views"), info.views, true)
            embed.addField(t("commands:np.like"), info.likeCount, true)
            embed.addField(t("commands:np.dislike"), info.dislikeCount, true)
            embed.addField(t("commands:np.comments"), info.commentCount, true)
            embed.addField(t("commands:np.duration"), `[${moment.duration(music.player.state.position).format('dd:hh:mm:ss')}/${moment.duration(music.nowPlaying.length).format('dd:hh:mm:ss')}]`, true)
            embed.addField(t("commands:np.loop"), music.repeat ? t("commands:true") : t("commands:false"), true)
            embed.addField(t("commands:np.link"), `[${t("commands:click-here")}](${info.url})`, true)

            message.channel.send(embed)
        })
    }
}