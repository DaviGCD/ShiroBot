const { Command } = require('../../utils')
const parse = require('parse-duration')
module.exports = class SeekCommand extends Command {
    constructor() {
        super({
            name: 'seek',
            aliases: ['posição'],
            category: 'music',
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false
        })
    }

    run(ctx) {
        let role = ctx.message.channel.guild.roles.get(ctx.db.guild.djRole)
        if (!role) {
            if (!ctx.client.player.has(ctx.message.guildID)) return ctx.quote(ctx.locale('commands:dj-module.playing-null'))
            if (!ctx.message.member.voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-channel-null'))
            if (ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID && ctx.message.member.voiceState.channelID !== ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-another-channel', { channel: ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID.name }))
            if (!ctx.args[0]) return ctx.quote(ctx.locale('commands:seek.args-null'))

            ctx.client.player.get(ctx.message.guildID).seek(parse(`${ctx.args[0]}s`))
            ctx.quote(ctx.locale('commands:seek.seeked'))
        } else {
            if (!ctx.message.member.roles.has(role.id)) return ctx.quote(ctx.locale('permissions:dj-permission'))
            if (!ctx.client.player.has(ctx.message.guildID)) return ctx.quote(ctx.locale('commands:dj-module.playing-null'))
            if (!ctx.message.member.voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-channel-null'))
            if (ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID && ctx.message.member.voiceState.channelID !== ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-another-channel', { channel: ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID.name }))
            if (!ctx.args[0]) return ctx.quote(ctx.locale('commands:seek.args-null'))

            ctx.client.player.get(ctx.message.guildID).seek(parse(`${ctx.args[0]}s`))
            ctx.quote(ctx.locale('commands:seek.seeked'))
        }
    }
}