const { ShardingManager } = require("discord.js")
require('./src/ProtoTypes').start()
const shards = new ShardingManager("./index.js", {
    respawn: true,
    totalShards: 1
})
shards.on("shardCreate", (shard) => {
    console.warn(`Starting shard: ${shard.id}`)
})
shards.spawn()