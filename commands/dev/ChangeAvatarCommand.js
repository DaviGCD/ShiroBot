const Command = require("../../src/structures/command")
module.exports = class ChangeAvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: "changeavatar",
            aliases: ["trocaravatar", "alteraravatar", "mudaravatar"],
            category: "dev",
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: true
        })
    }

    async run({message, args, server}, t) {
        let avatar = message.attachments.first() ? message.attachments.first().url : undefined || args[0]
        if (!avatar || avatar === undefined) return message.channel.send(t("commands:changeavatar.args-null"))

        if (!message.attachments.first()) {
            await this.client.user.setAvatar(avatar).then(() => {
                message.channel.send(t("commands:changeavatar.success"))
            })
        } else {
            await this.client.user.setAvatar(avatar).then(() => {
                message.channel.send(t("commands:changeavatar.success"))
            })
        }
    }
}