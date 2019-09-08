const lavalinkManager = require("../lavalink/lavalinkManager")
module.exports = class {
    constructor(client) {
        this.client = client
    }

    async run() {
        console.info("Connected")
        this.client.user.setPresence({activity: {name: `${this.client.config.prefix}help | ${this.client.users.size} usuários`, type: "PLAYING"}, status: "idle"})
        this.client.lavalink = new lavalinkManager(this.client)
    }
}