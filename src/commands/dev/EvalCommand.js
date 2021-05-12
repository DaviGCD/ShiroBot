const { Command } = require('../../utils')
module.exports = class EvalCommand extends Command {
  constructor() {
    super({
      name: 'eval',
      aliases: ['evaluate', 'e'],
      category: 'dev',
      UserPermission: null,
      ClientPermission: null,
      OnlyDevs: true
    })
  }

  async run(ctx) {
    try {
      let util = require('util')
      let code = ctx.args.join(' ')
      let ev = eval(code)
      let str = util.inspect(ev, {
        depth: 1
      })

      str = str.replace(new RegExp(ctx.client.token, 'g'), undefined)
      if (str.length > 1800) {
        str = str.substr(0, 1800)
        str = `${str}...`
      }
      ctx.quote(`\`\`\`js\n${str}\`\`\``)
    } catch (err) {
      if (err.stack.length > 1800) {
        err.stack = err.stack.substr(0, 1800)
        err.stack = `${err.stack}...`
      }
      ctx.quote(`\`\`\`${err.stack}\`\`\``)
    }
  }
}