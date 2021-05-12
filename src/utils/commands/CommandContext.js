module.exports = class CommandContext {
  constructor(client, message, args, database, locale) {
    this.client = client
    this.message = message
    this.args = args
    this.db = database
    this.locale = locale
  }

  async quote(content, options, file) {
    if (typeof content === 'object') {
      return await this.message.channel.createMessage(Object.assign(content, { messageReferenceID: this.message.id }, options), file)
    }

    return await this.message.channel.createMessage(Object.assign({ content: content }, { messageReferenceID: this.message.id }, options), file)
  }

  async quoteT(content, data, options = {}) {

    return await this.message.channel.createMessage(Object.assign({ content: this.locale(content, data) }, { messageReferenceID: this.message.id }, options))
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
}