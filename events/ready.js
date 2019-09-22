const lavalinkManager = require("../lavalink/lavalinkManager")
const { Client } = require("discord.js")
let client = new Client()
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run() {
        client = this.client
        console.info("Connected")
        function statusRandom() {
            let status = [{
                name: `${client.config.prefix}help | ${client.users.size} imanitys`,
                type: "PLAYING"
            },
            {
                name: `Shard: ${client.shard.ids}/${client.shard.count} | ${client.guilds.size} guilds`,
                type: "PLAYING"
            },
            {
                name: `Para me adicionar em sua guilda, use: ${client.config.prefix}invite`,
                type: "PLAYING"
            },
            {
                name: "No Game No Life",
                type: "WATCHING"
            },
            {
                name: `Minha versão atual é: ${require("../package.json").version}`,
                type: "PLAYING"
            },
            {
                name: `Xadrez`,
                type: "PLAYING"
            },
            {
                name: `Música com ${client.users.size} na shard ${client.shard.ids}`,
                type: "LISTENING"
            },
            {
                name: `Alegria para ${client.users.size} imanitys`,
                type: "STREAMING",
                url: "https://www.twitch.tv/davigc_ofc"
            }]
            
            let randomStatus = status[Math.floor(Math.random() * status.length)]
            client.user.setPresence({activity: randomStatus, status: "idle"})
        }

        statusRandom()
        setInterval(() => statusRandom(), 15000)
        client.lavalink = new lavalinkManager(client)
    }
}