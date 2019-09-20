const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            aliases: ["ajuda", "comandos", "commands"],
            category: "misc"
        })
    }

    run({message, args, server}, t) {

        let music = this.client.commands.filter(cmd => cmd.config.category === "music").map(cmd => `**${server.prefix}${cmd.config.name}** » ${t(`help:${cmd.config.name}`)}`).join("\n")
        let misc = this.client.commands.filter(cmd => cmd.config.category === "misc").map(cmd => `**${server.prefix}${cmd.config.name}** » ${t(`help:${cmd.config.name}`)}`).join("\n")
        let settings = this.client.commands.filter(cmd => cmd.config.category === "settings").map(cmd => `**${server.prefix}${cmd.config.name}** » ${t(`help:${cmd.config.name}`)}`).join("\n")
        let invite = this.client.generateInvite(37047552)
        invite.then(i => {
            let links = `[${t("commands:invite.title")}](${i}) - [${t("commands:support-server")}](https://discord.gg/c8EWvFK)\n[Discord Bot List](https://discordbots.org/bot/481289027753082890/vote) - [Bots Para Discord]https://botsparadiscord.xyz/bots/481289027753082890/votar)`
            const embed = new MessageEmbed()
            .setColor(this.client.colors.default)
            .addField(t("commands:help.music"), music)
            .addField(t("commands:help.misc"), misc)
            .addField(t("commands:help.settings"), settings)
            .addBlankField(true)
            .addField(t("commands:help.another-links"), `**${links}**`)
    
            message.author.send(embed).then(() => {
                message.channel.send(t("commands:dm.send-dm"))
            }).catch(() => {
                message.channel.send(t("commands:dm.dm-closed"))
            })
        })
    }
}