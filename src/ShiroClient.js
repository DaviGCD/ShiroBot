const { Client, Collection } = require('eris')
const { readdir } = require('fs')
const i18NModule = require('./utils/i18NModule')
const locale = new i18NModule()
module.exports = class ShiroClient extends Client {
    constructor(token, options = {}) {
        super(token, options)
        this.database = new (require('./utils/database/Database'))()
        this.commands = new Collection()
        this.config = require('../config')
        this.aliases = new Collection()
        this.player = new Collection()
        this.lavalink = null
    }

    connect() {
        super.connect()
        this.loadCommands()
        this.loadEvents()
        locale.load()
        return this
    }

    loadCommands() {
        readdir(`${__dirname}/commands`, (err, f) => {
            if (err) return console.error(err.stack)
            for (const category of f) {
                readdir(`${__dirname}/commands/${category}`, (err, cmds) => {
                    if (err) console.error(err.stack)
                    for (const cmd of cmds) {
                        const Command = require(`${__dirname}/commands/${category}/${cmd}`)
                        const command = new Command()
                        this.commands.set(command.config.name, command)
                        command.config.aliases.forEach(alias => this.aliases.set(alias, command.config.name))
                    }
                })
            }
        })
    }

    loadEvents() {
        readdir(`${__dirname}/events`, (err, f) => {
            if (err) return console.error(err.stack)
            for (const events of f) {
                const Event = require(`${__dirname}/events/${events}`)
                const event = new Event()
                super.on(event.name, (...args) => event.run(this, ...args))
            }
        })
    }
}