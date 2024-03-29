module.exports = class Collection {
  constructor(model) {
    this.model = model
  }

  findOneByID(id) {
    return this.findOne({ id })
  }

  findOne(...args) {
    return this.model.findOne(...args)
  }

  async getOrCreate(id, defaultValues) {
    const data = await this.findOneByID(id)
    if (!data) {
      return this.model({ id, ...defaultValues })
    }

    return data
  }

  async getAndDelete(id) {
    const data = await this.findOneByID(id)
    if (!data) return undefined

    return this.model.findOneAndDelete({ id })
  }
}