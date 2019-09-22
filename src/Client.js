const { Client, Collection } = require("discord.js")
const { readdir } = require("fs")
const http = require("http")
const express = require("express")
const app = express()
app.get("/", (req, res) => {
    res.sendStatus(200)
})
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me`)
}, 30000)
module.exports = class Shiro extends Client {
    constructor(options = {}) {
        super(options)
        this.database = require("./structures/database")
        this.commands = new Collection()
        this.config = require("../config")
        this.aliases = new Collection()
        this.colors = require("./structures/colors")
        this.player = new Map()
    }

    login(token) {
        super.login(token)
        return this
    }

    loadCommands(path) {
        readdir(path, (err, f) => {
            if (err) return console.error(err.stack)
            f.forEach(category => {
                readdir(`./${path}/${category}`, (err, cmd) => {
                    cmd.forEach(cmd => {
                        const Command = require(`.${path}/${category}/${cmd}`)
                        const command = new Command(this)
                        this.commands.set(command.config.name, command)
                        command.config.aliases.forEach(alias => this.aliases.set(alias, command.config.name))
                    })
                })
            })
        })
    }

    loadEvents(path) {
        readdir(path, (err, f) => {
            if (err) return console.error(err.stack)
            f.forEach(events => {
                const Event = require(`../${path}/${events}`)
                const event = new Event(this)
                super.on(events.split(".")[0], (...args) => event.run(...args))
            })
        })

        return this
    }
}