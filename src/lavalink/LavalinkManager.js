const { Manager } = require('@lavacord/eris')
const LavalinkPlayer = require('./LavalinkPlayer')
const { connect } = require('./LavalinkConfig')

module.exports = class LavalinkManager {
    constructor(client) {
        this.client = client
        this.manager = new Manager(this.client, connect, {
            user: this.client.user.id,
            shards: this.client.shards.size
        })
    }

    getBestHost() {
        return connect[Math.floor(Math.random() * connect.length)].id
    }

    async connect() {
        try {
            await this.manager.connect()
            console.log('Lavalink has been sucessfully connected.')
        } catch {
            console.error('No lavalink connected.')
        }
    }

    async join(channel) {
        const manager = await this.manager.join({ channel, guild: this.client.getChannel(channel).guild.id, node: this.getBestHost() }, { selfdeaf: true })
        return new LavalinkPlayer(manager)
    }
}