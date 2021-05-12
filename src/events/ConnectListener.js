const { EventListener } = require('../utils')
const { options } = require('../../config')
module.exports = class ConnectListener extends EventListener {
    constructor() {
        super('connect')
    }

    async run(client, id) {
        if (id === options.maxShards - 1) {
            client.emit('ready', client)
        }

        console.log(`Shard ${id} has been successfully connected.`)
    }
}