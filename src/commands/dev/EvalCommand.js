const Command = require("../../src/structures/command")
module.exports = class EvalCommand extends Command {
    constructor(client) {
        super(client, {
            name: "eval",
            aliases: ["evaluate", "e"],
            category: "dev",
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: true
        })
    }

    async run({message, args, server}, t) {
        try {
            let util = require("util")
            let code = args.join(" ")
            let ev = eval(code)
            let str = util.inspect(ev, {
                depth: 1
            })

            str = str.replace(new RegExp(this.client.token, "g"), "undefined")
            if (str.length > 1800) {
                str = str.substr(0, 1800)
                str = `${str}...`
            }
            message.channel.send(str, {code: "js"})
        } catch (err) {
            if (err.stack.length > 1800) {
                err.stack = err.stack.substr(0, 1800)
                err.stack = `${err.stack}...`
            }
            message.channel.send(err.stack, {code: "js"})
        }
    }
}