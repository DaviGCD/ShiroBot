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
        let avatar = message.attachments.first() ? message.attachments.first().url : null || args[0]
        if (avatar === null) return message.channel.send(t("commands:changeavatar.args-null"))

        await this.client.user.setAvatar(avatar).then(() => {
            message.channel.send(t("commands:changeavatar.success"))
        })
    }
}