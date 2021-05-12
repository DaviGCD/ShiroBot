const { EventListener } = require('../utils')
const fs = require('fs')
const i18next = require('i18next')
const translationBackend = require('i18next-node-fs-backend')

module.exports = class GuildCreateListener extends EventListener {
    constructor() {
        super('guildCreate')
    }

    async run(client, guild) {
        let region = {
            'brazil': 'pt-BR',
            'eu-central': 'en-US',
            'eu-west': 'en-US',
            'hongkong': 'en-US',
            'japan': 'en-US',
            'russia': 'en-US',
            'singapore': 'en-US',
            'southafrica': 'en-US',
            'sydney': 'en-US',
            'us-central': 'en-US',
            'us-east': 'en-US',
            'us-south': 'en-US',
            'us-west': 'en-US'
        }

        console.info(`[INFO] | [GUILD ADD] - GUILD: ${guild.name} (${guild.id}) - OWNER: ${guild.owner.user.tag} (${guild.owner.user.id}) - TOTAL MEMBERS: ${guild.memberCount} members`)
        let server = await client.database.Guilds.findById(guild.id)
        if (!server) {
            server = new client.database.Guilds({
                _id: guild.id,
                lang: region[guild.region]
            })
            server.lang = region[guild.region]
            server.save()
            let t
            const setFixedT = function (translate) {
                t = translate
            }
            const language = (server && server.lang) || 'pt-BR'
            setFixedT(i18next.getFixedT(language))

            return new Promise(async (resolve, reject) => {
                i18next.use(translationBackend).init({
                    ns: ['commands', 'events', 'permissions', 'help'],
                    preload: await fs.readdirSync('./src/locales/'),
                    fallbackLng: 'pt-BR',
                    backend: {
                        loadPath: './src/locales/{{lng}}/{{ns}}.json'
                    },
                    interpolation: {
                        escapeValue: false
                    },
                    returnEmptyString: false
                }, async (err, f) => {
                    if (f) {
                        if (server) {
                            guild.channels.filter(c => c.type === 'text').random().send(t('events:joined', { client: client.user.username, prefix: server.prefix })).catch(() => { })
                        }
                    }
                })
            })
        } else {
            let t
            const setFixedT = function (translate) {
                t = translate
            }
            const language = (server && server.lang) || 'pt-BR'
            setFixedT(i18next.getFixedT(language))
            return new Promise(async (resolve, reject) => {
                i18next.use(translationBackend).init({
                    ns: ['commands', 'events', 'permissions', 'help'],
                    preload: await fs.readdirSync('./src/locales/'),
                    fallbackLng: 'pt-BR',
                    backend: {
                        loadPath: './src/locales/{{lng}}/{{ns}}.json'
                    },
                    interpolation: {
                        escapeValue: false
                    },
                    returnEmptyString: false
                }, async (err, f) => {
                    if (f) {
                        guild.channels.filter(c => c.type === 'text').random().send(t('events:joined', { client: client.user.username, prefix: server.prefix })).catch(() => { })
                    }
                })
            })
        }
    }
}