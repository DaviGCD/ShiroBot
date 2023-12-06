module.exports = class Command {
  constructor(options) {
    this.config = {
      name: options.name || null,
      aliases: options.aliases || [],
      category: options.category || 'music',
      UserPermission: options.UserPermission || [],
      ClientPermission: options.ClientPermission || [],
      OnlyDevs: options.OnlyDevs || false,
      slash: options?.slash ? Object.assign(options.slash, {
        dm_permission: false
      }) : null
    }
  }

  setLocale(locale) {
    this.config.locale = locale
  }

  getLocale() {
    return this.config.locale
  }
}