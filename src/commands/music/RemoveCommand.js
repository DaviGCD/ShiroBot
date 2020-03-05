const Command = require("../../structures/command")
module.exports = class RemoveCommand extends Command {
    constructor(client) {
        super(client, {
            name: "remove",
            aliases: ["remover"],
            category: "music"
        })
    }

    async run({ message, args, server }, t) {
        if (!args[0]) return message.channel.send(t("commands:remove.args-null"))
        let invalidNumber = Number(args[0]) || Number(args[0]) === Infinity || isNaN(args[0])
        if (!invalidNumber) return message.channel.send(t("commands:remove.not-number"))
        let number = args[0] < 0 || args[0] > this.client.player.get(message.guild.id).queue.length
        if (number) return message.channel.send(t("commands:remove.max-and-minimum", { max: this.client.player.get(message.guild.id).queue.length }))

        message.channel.send(t("commands:remove.removed")).then(() => {
            this.client.player.get(message.guild.id).queue.splice(Number(args[0]) - 1, 1)
        })
    }
}