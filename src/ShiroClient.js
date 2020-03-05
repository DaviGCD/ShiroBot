const { Client, Collection } = require("discord.js")
const { readdir } = require("fs")
module.exports = class ShiroClient extends Client {
    constructor(options = {}) {
        super(options)
        this.database = require("./structures/database")
        this.commands = new Collection()
        this.config = require("../config")
        this.aliases = new Collection()
        this.colors = require("./structures/colors")
        this.player = new Collection()
    }

    login(token) {
        super.login(token)
        return this
    }

    loadCommands() {
        readdir(`${__dirname}/commands`, (err, f) => {
            if (err) return console.error(err.stack)
            f.forEach(category => {
                readdir(`${__dirname}/commands/${category}`, (err, cmd) => {
                    cmd.forEach(cmd => {
                        const Command = require(`${__dirname}/commands/${category}/${cmd}`)
                        const command = new Command(this)
                        this.commands.set(command.config.name, command)
                        command.config.aliases.forEach(alias => this.aliases.set(alias, command.config.name))
                    })
                })
            })
        })
    }

    loadEvents() {
        readdir(`${__dirname}/events`, (err, f) => {
            if (err) return console.error(err.stack)
            f.forEach(events => {
                const Event = require(`${__dirname}/events/${events}`)
                const event = new Event(this)
                super.on(events.split(".")[0], (...args) => event.run(...args))
            })
        })

        return this
    }
}