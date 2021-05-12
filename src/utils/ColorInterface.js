const defaultColors = {
  DEFAULT: '#b200ff'
}

module.exports = class ColorInterface {
  static resolve(color) {
    if (typeof color !== 'string') throw new Error(`Unexpected type ${typeof color} while building the embed`)
    if (!color) color = null
    if (defaultColors[color.toUpperCase()]) {
      color = defaultColors[color.toUpperCase()]
    } else {
      color = color ? color : null
    }

    return parseInt(color.replace('#', ''), 16)
  }
}