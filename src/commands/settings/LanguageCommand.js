const { Command } = require('../../utils')
module.exports = class LanguageCommand extends Command {
  constructor() {
    super({
      name: 'language',
      aliases: ['linguagem', 'lang', 'idioma'],
      category: 'settings',
      UserPermission: ['MANAGE_GUILD'],
      slash: {
        name: 'language',
        description: 'Changes my language in current server.',
        options: [
          {
            type: 3,
            name: 'language-key',
            description: 'Selects the language you want to set',
            required: false,
            choices: [
              {
                name: 'English',
                value: 'en-US'
              },
              {
                name: 'Brazilian Portuguese',
                value: 'pt-BR'
              }
            ]
          }
        ]
      }
    })
  }

  run(ctx) {
    const ascii = `== LANGUAGE LIST ==\n\n• Português (pt-BR) :: Traduzida por: ${ctx.client.users.get('318155799270522880')?.username ?? 'Unknown'}\n• English (en-US) :: Translated by: ${ctx.client.users.get('318155799270522880')?.username ?? 'Unknown'}`
    const option = ctx.getArgs('language-key') ? ctx.getArgs('language-key').value : ctx.args[0]
    switch (option) {
      case 'pt-BR': {
        ctx.db.guild.lang = 'pt-BR'
        ctx.db.guild.save().then(() => {
          ctx.quote('Certo, por agora eu irei falar em `Português`.')
        })
      }
        break;
      case 'en-US': {
        ctx.db.guild.lang = 'en-US'
        ctx.db.guild.save().then(() => {
          ctx.quote('Alright, for now I will speak in `English`.')
        })
      }
        break;
      default: {
        ctx.quote(`\`\`\`asciidoc\n${ascii}\`\`\``)
      }
    }
  }
}