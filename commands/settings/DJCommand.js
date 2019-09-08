const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class DJCommand extends Command {
    constructor(client) {
        super(client, {
            name: "dj",
            aliases: [],
            category: "settings",
            UserPermission: ["MANAGE_GUILD"]
        })
    }

    run({message, args, server}, t) {
       let role = message.mentions.roles.first() || message.guild.roles.get(`${args[0]}`.replace(/[<@&>]/g))
       if (!role) {
            const embed = new MessageEmbed()
            .setColor(this.client.colors.default)
            .setDescription(t("commands:dj-module.dj.args-null", {prefix: server.prefix}))

            return message.channel.send(embed)
       }
       

       server.djRole = role.id
       server.save()

       message.channel.send(t("commands:dj-module.dj.success"))
    }
}