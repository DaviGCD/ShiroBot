const { EventListener } = require('../utils')

module.exports = class MessageUpdateListener extends EventListener {
  constructor() {
    super('messageUpdate')
  }

  run(client, newMessage, oldMessage) {
    if (oldMessage?.content === newMessage?.content) return
    client.emit('messageCreate', newMessage)
  }
}