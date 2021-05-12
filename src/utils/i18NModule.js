const { readdirSync } = require('fs')
const i18next = require('i18next')
const translationBackend = require('i18next-node-fs-backend')

module.exports = class I18NModule {
    constructor() {
        this.languages = ['pt-BR', 'en-US']
        this.ns = ['commands', 'basic', 'permissions', 'help']
    }

    getLocale(language) {
        let t
        const lang = language || 'en-US'
        const setFixedT = function (translate) {
            t = translate
        }

        setFixedT(i18next.getFixedT(lang))

        return t
    }

    load() {
        try {
            this.loadLocales()
            console.log('Locales loaded')
            return true
        } catch {
            console.error('Failed to load the locales')
        }
    }

    async loadLocales() {
        try {
            i18next.use(translationBackend).init({
                ns: this.ns,
                preload: readdirSync('./src/locales'),
                fallbackLng: 'en-US',
                backend: {
                    loadPath: './src/locales/{{lng}}/{{ns}}.json'
                },
                interpolation: {
                    escapeValue: false
                },
                returnEmptyString: false
            })
        } catch (err) {
            console.log(err)
        }
    }
}