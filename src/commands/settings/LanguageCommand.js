const { Command } = require('../../utils')
module.exports = class LanguageCommand extends Command {
  constructor() {
    super({
      name: 'language',
      aliases: ['linguagem', 'lang', 'idioma'],
      category: 'settings',
      UserPermission: ['MANAGE_GUILD']
    })
  }

  run(ctx) {

    let ascii = `== LANGUAGE LIST ==\n\n• Português :: Traduzida por: ${ctx.client.users.get('318155799270522880').username}\n• English :: Translated by: ${ctx.client.users.get('318155799270522880').username}`
    ctx.quote(ascii, { code: 'asciidoc' }).then(msg => {
      setTimeout(() => {
        msg.reacctx.locale('🇧🇷')
      }, 500)
      setTimeout(() => {
        msg.reacctx.locale('🇺🇸')
      }, 1000)

      const collector = msg.createReactionCollector((r, u) => (r.emoji.name === '🇧🇷', '🇺🇸') && (u.id !== ctx.client.user.id && u.id === ctx.message.author.id))
      collector.on('collect', r => {
        switch (r.emoji.name) {
          case '🇧🇷':
            ctx.db.guild.lang = 'pt-BR'
            ctx.db.guild.save()
            msg.delete()
            ctx.quote('Agora eu irei falar em `Português BR`.')
            break;
          case '🇺🇸':
            ctx.db.guild.lang = 'en-US'
            ctx.db.guild.save()
            msg.delete()
            ctx.quote('Now I will speak `English US`.')
        }
      })
    })
  }
}