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
                name: `${client.config.prefix}help | ${Number(client.users.size).toLocaleString()} imanitys`,
                type: "PLAYING"
            },
            {
                name: `Shard: ${client.shard.ids}/${client.shard.count} | ${Number(client.guilds.size).toLocaleString()} guilds`,
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
                name: `Música com ${Number(client.users.size).toLocaleString()} na shard ${client.shard.ids}`,
                type: "LISTENING"
            },
            {
                name: `Alegria para ${Number(client.users.size).toLocaleString()} imanitys`,
                type: "STREAMING",
                url: "https://www.twitch.tv/davigc_ofc"
            }]

            let randomStatus = status[Math.floor(Math.random() * status.length)]
            client.user.setPresence({ activity: randomStatus, status: "dnd" })
        }

        statusRandom()
        setInterval(() => statusRandom(), 15000)
        client.lavalink = new lavalinkManager(client)
    }
}