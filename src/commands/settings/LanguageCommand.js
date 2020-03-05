const Command = require("../../src/structures/command")
module.exports = class LanguageCommand extends Command {
    constructor(client) {
        super(client, {
            name: "language",
            aliases: ["linguagem", "lang", "idioma"],
            category: "settings",
            UserPermission: ["MANAGE_GUILD"]
        })
    }

    run({message, args, server}, t) {

        let ascii = `== LANGUAGE LIST ==\n\n• Português :: Traduzida por: ${this.client.users.get("318155799270522880").username}\n• English :: Translated by: ${this.client.users.get("318155799270522880").username}`
        message.channel.send(ascii, {code: "asciidoc"}).then(msg => {
            setTimeout(() => {
                msg.react("🇧🇷")
            }, 500)
            setTimeout(() => {
                msg.react("🇺🇸")
            }, 1000)

            const collector = msg.createReactionCollector((r, u) => (r.emoji.name === "🇧🇷", "🇺🇸") && (u.id !== this.client.user.id && u.id === message.author.id))
            collector.on("collect", r => {
                switch(r.emoji.name) {
                    case "🇧🇷":
                        server.lang = "pt-BR"
                        server.save()
                        msg.delete()
                        message.channel.send("Agora eu irei falar em `Português BR`.")
                        break;
                    case "🇺🇸":
                        server.lang = "en-US"
                        server.save()
                        msg.delete()
                        message.channel.send("Now I will speak `English US`.")
                }
            })
        })
    }
}