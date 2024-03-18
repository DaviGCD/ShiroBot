const { Command, Constants } = require('../../utils')
module.exports = class GenerateKeyCommand extends Command {
  constructor() {
    super({
      name: 'generatekey',
      aliases: ['genkey'],
      category: 'dev',
      UserPermission: null,
      ClientPermission: null,
      OnlyDevs: true
    })
  }

  async run(ctx) {
    const guild_id = ctx.args[0]
    const plan = ctx.args[1]
    const owner_id = ctx.args[2]
    if (!guild_id) return ctx.quote('You haven\'t typed the ID of the guild!')
    if (!plan) return ctx.quote('You have to inform what plan you want to set!')
    if (!owner_id) return ctx.quote('You haven\'t typed the ID of the user!')
    const key_data = await ctx.client.database.premiumkeys.getOrCreate(owner_id)
    const user = await ctx.client.database.users.getOrCreate(owner_id)
    const key = Constants.generateKeyPremium({
      created_at: Date.now(),
      expire_in: Date.now() + 2628000,
      owner_id,
      guild_id,
      plan
    })

    key_data.keys.push(key)
    key_data.save()
    user.premium.set({
      plan: key.plan,
      donated_at: key.created_at,
      expire_in: key.expire_in,
      total_donated: Number(ctx.db.user.premium.total_donated) + Number(key.value),
      keys: ctx.db.premiumkey.keys
    })

    user.save()
    ctx.quote(`Key ${key.id} owned by <@${owner_id}> with the selected plan \`${key.plan}\` was successfully created!`)
  }
}