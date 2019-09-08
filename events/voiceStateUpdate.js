module.exports = class VoiceStateUptade {
    constructor(client) {
        this.client = client
    }

    async run(oldMember, newMember) {
        if (this.client.player.get(oldMember.guild.id)) {
            let voiceChannel = this.client.channels.get(this.client.player.get(oldMember.guild.id).player.channel)
            if (voiceChannel.members.size === 1) {
                await this.client.lavalink.manager.leave(oldMember.guild.id)
                this.client.lavalink.manager.delete(oldMember.guild.id)
                this.client.player.delete(oldMember.guild.id)
            }
        }
    }
}