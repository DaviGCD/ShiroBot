const Client = require("./src/Client")
const client = new Client({
    fetchAllMembers: true,
    disableEveryone: true
})
require("dotenv").config()
const DBL = require("dblapi.js")
const dbl = new DBL(process.env.DBL, client)
dbl.on("error", (err) => {
    console.error(err)
})
client.login(process.env.TOKEN)
client.loadCommands("./commands")
client.loadEvents("./events")
require("./src/ProtoTypes").start()
console.info("Connecting...")