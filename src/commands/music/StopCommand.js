const { Command } = require('../../utils')
const parse = require('parse-duration')
module.exports = class StopCommand extends Command {
    constructor() {
        super({
            name: 'stop',
            aliases: ['parar', 'leave', 'sair'],
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

            ctx.client.player.get(ctx.message.guildID).player.stop()
            ctx.client.player.delete(ctx.message.guildID)
            ctx.quote(ctx.locale('commands:stop', { channel: ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID.name }))
            ctx.client.lavalink.manager.leave(ctx.message.guildID)
            ctx.client.lavalink.manager.players.delete(ctx.message.guildID)
        } else {
            if (!ctx.message.member.roles.has(role.id)) return ctx.quote(ctx.locale('permissions:dj-permission'))
            if (!ctx.client.player.has(ctx.message.guildID)) return ctx.quote(ctx.locale('commands:dj-module.playing-null'))
            if (!ctx.message.member.voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-channel-null'))
            if (ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID && ctx.message.member.voiceState.channelID !== ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID) return ctx.quote(ctx.locale('commands:dj-module.user-another-channel', { channel: ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID.name }))

            ctx.client.player.get(ctx.message.guildID).player.stop()
            ctx.client.player.delete(ctx.message.guildID)
            ctx.quote(ctx.locale('commands:stop', { channel: ctx.message.channel.guild.members.get(ctx.client.user.id).voiceState.channelID.name }))
            ctx.client.lavalink.manager.leave(ctx.message.guildID)
            ctx.client.lavalink.manager.players.delete(ctx.message.guildID)
        }
    }
}