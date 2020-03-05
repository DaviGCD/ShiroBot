const Command = require("../../src/structures/command")
module.exports = class BlackListCommand extends Command {
    constructor(client) {
        super(client, {
            name: "blacklist",
            aliases: ["listanegra"],
            category: "dev",
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: true
        })
    }

    async run({message, args, server}, t) {
        let member = this.client.users.get(args[1])
        let user = await this.client.database.Users.findById(member.id)
        if (!args.slice(2).join(" ")) {
            args.slice(2).join(" ") === ""
        }
        switch(args[0]) {
            case "add":
            if (!member) return message.channel.send(t("commands:blacklist.member-args-null"))
            user.blacklist = true
            user.blacklistreason = args.slice(2).join(" ")
            user.save()
            message.channel.send(t("commands:blacklist.banned"))
            break;
            case "remove":
            if (!member) return message.channel.send(t("commands:blacklist.member-args-null"))
            user.blacklist = false
            user.blacklistreason = ""
            user.save()
            message.channel.send(t("commands:blacklist.unbanned"))
            break;
            case "view":
            if (!member) return message.channel.send(t("commands:blacklist.member-args-null"))
            let msg = `== USER BANNED INFO ==\n\n• User :: ${this.client.users.get(user._id).tag} - (${this.client.users.get(user._id).id})\n• Banned :: ${user.blacklist}\n• Reason :: ${user.blacklistreason}`
            message.channel.send(msg, {code: "asciidoc"})
            break;
            default:
            message.channel.send("Use `add` `remove` `view`")
        }
    }
}