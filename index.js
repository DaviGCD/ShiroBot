const Client = require('./src/ShiroClient')
const { options } = require('./config')
const client = new Client(process.env["TOKEN"], options)
client.connect()