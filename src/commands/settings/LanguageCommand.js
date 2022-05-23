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
    const ascii = `== LANGUAGE LIST ==\n\n• Português (pt-BR) :: Traduzida por: ${ctx.client.users.get('318155799270522880').username}\n• English (en-US) :: Translated by: ${ctx.client.users.get('318155799270522880').username}`
    ctx.quote(`\`\`\`asciidoc\n${ascii}\`\`\``)
    switch (ctx.args[0]) {
      case 'pt-BR': {
        ctx.db.guild.lang = 'pt-BR'
        ctx.db.guild.save().then(() => {
          ctx.quote('Certo, por agora eu irei falar em `Português`.')
        })
      }
        break;
      case 'en-US': {
        ctx.db.guild.lang = 'pt-BR'
        ctx.db.guild.save().then(() => {
          ctx.quote('Alright, for now I will speak in `English`.')
        })
      }
      default: {
        ctx.quote(`\`\`\`asciidoc\n${ascii}\`\`\``)
      }
    }
  }
}