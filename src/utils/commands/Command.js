module.exports = class Command {
    constructor(options) {
        this.config = {
            name: options.name || null,
            aliases: options.aliases || [],
            category: options.category || 'music',
            UserPermission: options.UserPermission || [],
            ClientPermission: options.ClientPermission || [],
            OnlyDevs: options.OnlyDevs || false
        }
    }

    setLocale(locale) {
        this.config.locale = locale
    }

    getLocale() {
        return this.config.locale
    }
}