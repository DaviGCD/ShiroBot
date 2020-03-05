const Command = require("../../structures/command")
module.exports = class PrefixCommand extends Command {
    constructor(client) {
        super(client, {
            name: "prefix",
            aliases: [],
            category: "settings",
            UserPermission: ["MANAGE_GUILD"],
            ClientPermission: null,
            OnlyDevs: false
        })
    }

    run({message, args, server}, t) {
        if (!args[0]) return message.channel.send(t("commands:prefix.args-null"))
        
        server.prefix = args[0]
        server.save()
        
        message.channel.send(t("commands:prefix.success"))
    }
}