module.exports = class CommandContext {
  constructor(client, message, args, database, locale) {
    this.client = client
    this.message = message
    this.args = args
    this.db = database
    this.locale = locale
  }

  async quote(content, options, file) {
    if (!this.message.data) {
      if (typeof content === 'object') {
        return await this.message.channel.createMessage(Object.assign(content, options), file)
      }
      
      return await this.message.channel.createMessage(Object.assign({ content: content }, options), file)
    } else {
      if (typeof content === 'object') {
        return await this.message.createMessage(Object.assign(content, options), file)
      }
      
      return await this.message.createMessage(Object.assign({ content: content }, options), file)
    }
  }

  async quoteT(content, data, options = {}) {
    if (!this.message.data) {
      return await this.message.channel.createMessage(Object.assign({ content: this.locale(content, data) },  options))
    } else {
      return await this.message.createMessage(Object.assign({ content: this.locale(content, data) },  options))
    }
  }

  async getUser(args) {
    try {
      const member = await this.client.getRESTUser(args.replace(/[<@!>]/g, ''))
      return member
    } catch {
      const member = this.message.channel.guild.members.find((member) => member.username.toLowerCase().includes(args.toLowerCase())) || this.message.channel.guild.members.find((member) => `${member.username}#${member.discriminator}`.toLowerCase() === args.toLowerCase())
      if (!member) return false

      return member.user
    }
  }
  
  getArgs(type) {
    if (!this.args) return this.args = []
    if (this.args[0]?.name) {
      const args = this.args.find(it => it.name === type)
      return args
    } else {
      return null
    }
  }
}