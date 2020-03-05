const moment = require("moment")
const fs = require("fs")
const i18next = require("i18next")
const translationBackend = require("i18next-node-fs-backend")
const cooldown = new Map()
require("moment-duration-format")
module.exports = class MessageReceive {
    constructor(client) {
        this.client = client
    }

    async run(message) {

        if (message.channel.type === "dm") return
        if (message.author.bot) return

        let user = await this.client.database.Users.findById(message.author.id)
        if (!user) {
            let newUser = new this.client.database.Users({
                _id: message.author.id
            })
            newUser.save()
        }

        let server = await this.client.database.Guilds.findById(message.guild.id)
        if (!server) {
            let region = {
                "brazil": "pt-BR",
                "eu-central": "en-US",
                "eu-west": "en-US",
                "hongkong": "en-US",
                "japan": "en-US",
                "russia": "en-US",
                "singapore": "en-US",
                "southafrica": "en-US",
                "sydney": "en-US",
                "us-central": "en-US",
                "us-east": "en-US",
                "us-south": "en-US",
                "us-west": "en-US"
            }
            let guild = new this.client.database.Guilds({
                _id: message.guild.id,
                lang: region[message.guild.region]
            })
            guild.save()
        }

        let t;
        const setFixedT = function (translate) {
            t = translate
        }
        const language = (server && server.lang) || "pt-BR"
        setFixedT(i18next.getFixedT(language))
        return new Promise(async (res, rej) => {
            i18next.use(translationBackend).init({
                ns: ["commands", "events", "permissions", "help"],
                preload: await fs.readdirSync(`./src/locales/`),
                fallbackLng: "pt-BR",
                backend: {
                    loadPath: `./src/locales/{{lng}}/{{ns}}.json`
                },
                interpolation: {
                    escapeValue: false
                },
                returnEmptyString: false
            }, async (err, f) => {
                if (f) {
                    let mention = message.content === `<@${this.client.user.id}>` || message.content === `<@!${this.client.user.id}>`
                    if (mention) return message.channel.send(t("events:mention", { prefix: server.prefix }))

                    if (!message.content.startsWith(server.prefix)) return
                    const args = message.content.slice(server.prefix.length).trim().split(/ +/g)
                    const command = args.shift().toLowerCase()
                    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command))
                    if (!cmd) return

                    if (user.blacklist) return
                    if (cooldown.has(message.author.id)) {
                        let time = cooldown.get(message.author.id)
                        return message.channel.send(t("events:cooldown.message", { time: (time - Date.now() > 1000) ? moment.utc(time - Date.now()).format(`s [${t("events:cooldown.secounds")}]`) : moment.duration(time - Date.now()).format(`[${t("events:cooldown.milliseconds")}]`) }))
                    }
                    cooldown.set(message.author.id, Date.now() + 5000)

                    setTimeout(() => {
                        cooldown.delete(message.author.id)
                    }, 5000)

                    if (cmd.config.OnlyDevs) {
                        if (!this.client.config.owner.some(owner => message.author.id === owner)) {
                            message.channel.send(t("permissions:ONLY_DEVS"))
                            return
                        }
                    }
                    let userPerm = cmd.config.UserPermission
                    let clientPerm = cmd.config.ClientPermission
                    if (userPerm !== null) {
                        if (!message.member.hasPermission(userPerm)) {
                            let perm = userPerm.map(value => t(`permissions:${value}`)).join(", ")
                            message.channel.send(t("permisions:user-missing-permission", { perm: perm }))
                            return
                        }
                    }
                    if (clientPerm !== null) {
                        if (!message.guild.me.hasPermission(clientPerm)) {
                            let perm = clientPerm.map(value => t(`permissions:${value}`)).join(", ")
                            message.channel.send(t("permissions:client-missing-permission", { perm: perm }))
                            return
                        }
                    }
                    cmd.setT(t)
                    new Promise((res, rej) => {
                        message.channel.startTyping()
                        res(cmd.run({ message, args, server }, t))
                    }).then(() => {
                        message.channel.stopTyping()
                    }).catch(err => {
                        if (err.stack.length > 1800) {
                            err.stack = err.stack.substr(0, 1800)
                            err.stack = `${err.stack}...`
                        }
                        message.channel.send(err.stack, { code: "js" })
                        message.channel.stopTyping()
                    })
                }
            })
        })
    }
}