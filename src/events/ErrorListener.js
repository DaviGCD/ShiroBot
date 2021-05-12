const { EventListener } = require('../utils')
module.exports = class ErrorListener extends EventListener {
    constructor() {
        super('error')
    }

    run(client, err) {
        console.error(err)
    }
}