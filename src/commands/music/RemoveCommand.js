const { Command } = require('../../utils')
module.exports = class RemoveCommand extends Command {
  constructor() {
    super({
      name: 'remove',
      aliases: ['remover'],
      category: 'music'
    })
  }

  async run(ctx) {
    if (!ctx.args[0]) return ctx.quote(ctx.locale('commands:remove.args-null'))
    let invalidNumber = Number(ctx.args[0]) || Number(ctx.args[0]) === Infinity || isNaN(ctx.args[0])
    if (!invalidNumber) return ctx.quote(ctx.locale('commands:remove.not-number'))
    let number = ctx.args[0] < 0 || ctx.args[0] > ctx.client.player.get(ctx.message.guildID).queue.length
    if (number) return ctx.quote(ctx.locale('commands:remove.max-and-minimum', { max: ctx.client.player.get(ctx.message.guildID).queue.length }))

    ctx.quote(ctx.locale('commands:remove.removed')).then(() => {
      ctx.client.player.get(ctx.message.guildID).queue.splice(Number(ctx.args[0]) - 1, 1)
    })
  }
}