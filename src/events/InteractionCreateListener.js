const { EventListener } = require('../utils')
const CommandRunner = require('../utils/commands/CommandRunner')
module.exports = class ReadyListener extends EventListener {
  constructor() {
    super('interactionCreate')
  }

  async run(client, interaction) {
    if (interaction.type !== 2) return
    CommandRunner.runSlash(client, interaction)
  }
}