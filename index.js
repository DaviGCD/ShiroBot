const Client = require('./src/ShiroClient')
const { token, options } = require('./config')
const client = new Client(token, options)
client.connect()