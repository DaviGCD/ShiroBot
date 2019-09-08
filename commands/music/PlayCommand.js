const Command = require("../../src/structures/command")
const moment = require("moment")
require("moment-duration-format")
module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: "play",
            aliases: ["tocar"],
            category: "music",
            UserPermission: null,
            ClientPermission: ["CONNECT", "SPEAK", "USE_VAD"],
            OnlyDevs: false
        })
    }

    async run({message, args, server}, t) {
        if (!message.member.voice.channel) return message.channel.send(t("commands:dj-module.user-channel-null"))
        if (message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send(t("commands:dj-module.user-another-channel", {channel: message.guild.me.voice.channel.name}))
        if (!args[0]) return message.channel.send(t("commands:play.args-null"))
        
        if (this.client.lavalink.manager.has(message.guild.id)) {
            this.client.player.get(message.guild.id).play(args.join(" ")).then(info => {
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
            music.play(args.join(" "));
            this.client.player.set(message.guild.id, music)
        }
    }
}