const Command = require("../../src/structures/command")
const YouTube = require("simple-youtube-api")
const youtube = new YouTube("AIzaSyAfEYgTf8XmbPe8mBz9baavfpPG0n5jTnI")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
require("moment-duration-format")
let num = 0

module.exports = class SearchCommand extends Command {
    constructor(client) {
        super(client, {
            name: "search",
            aliases: ["procurar", "pesquisar"],
            category: "dev"
        })
    }

    async run({message, args, server}, t) {

    }
}