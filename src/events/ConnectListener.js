const { EventListener } = require('../utils')

module.exports = class ConnectListener extends EventListener {
  constructor() {
    super('connect')
  }

  async run(client, id) {

    console.log(`Shard ${id} has been successfully connected.`)
  }
}