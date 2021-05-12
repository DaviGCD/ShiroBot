const { EventListener } = require('../utils')
const CommandRunner = require('../utils/commands/CommandRunner')
module.exports = class MessageCreateListener extends EventListener {
  constructor() {
    super('messageCreate')
  }

  async run(client, message) {
    CommandRunner.run(client, message)
  }
}