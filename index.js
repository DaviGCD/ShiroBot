require("./src/ProtoTypes").start()
console.info("Connecting...")

const http = require("http")
const express = require("express")
const app = express()
app.get("/", (req, res) => {
    res.sendStatus(200)
})
app.listen(process.env.PORT)
setInterval(() => http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`), 5000)
const Client = require("./src/ShiroClient")
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
client.loadCommands()
client.loadEvents()