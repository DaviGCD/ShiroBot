module.exports = class Command {
    constructor(client, options) {
        this.client = client
    
        this.config = {
            name: options.name || null,
            aliases: options.aliases || [],
            category: options.category || "music",
            UserPermission: options.UserPermission || null,
            ClientPermission: options.ClientPermission || null,
            OnlyDevs: options.OnlyDevs || false
        }
    }

    setT(t) {
        this.config.t = t
    }

    getT() {
        return this.config.t
    }
}