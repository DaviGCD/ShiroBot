const Command = require("../../src/structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class InviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: "invite",
            aliases: ["convite", "convidar", "adicionar"],
            category: "misc",
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false
        })
    }

    run({message, args, server}, t) {
        this.client.generateInvite(37047552).then(invite => {
            const embed = new MessageEmbed()
            .setColor(this.client.colors.default)
            .addField(t("commands:invite.title"), t("commands:invite.description", {invite: invite}))

            message.author.send(embed).then(() =>  { 
                message.channel.send(t("commands:dm.send-dm"))
            }).catch(() => {
                message.channel.send(t("commands:dm.dm-closed"))
            })
        })
    }
}