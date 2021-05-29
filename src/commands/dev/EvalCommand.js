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
      const util = require('util')
      const code = ctx.args.join(' ')
      const ev = eval(code)
      let str = util.inspect(ev, { depth: 1 })

      str = str.replace(new RegExp(`${ctx.client.token}`, 'g'), undefined)
      if (str.length > 1800) str = str.substr(0, 1800)

      ctx.quote(`\`\`\`js\n${str}\`\`\`\n\n\`\`\`js\n${typeof str}\`\`\``)
    } catch (err) {

      ctx.quote(`\`\`\`${err.message}\`\`\`\n\n\`\`\`js\n${typeof str}\`\`\``)
    }
  }
}