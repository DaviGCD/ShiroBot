const moment = require("moment")
require("colors")
module.exports = class ProtoTypes {
  static start() {
    console.info = function log(log) {
      console.log(`[${`[LOG] ${moment().format("DD/MM/YYYY hh:mm:ss")}`.green}] | ${log}`)
    }
    console.warn = function log(warn) {
      console.log(`[${`[WARN] ${moment().format("DD/MM/YYYY hh:mm:ss")}`.yellow}] | ${warn}`)
    }
    console.error = function error(err) {
      console.log(`[${`[ERROR] ${moment().format("DD/MM/YYYY hh:mm:ss")}`.red}] | ${err}`)
    }
  }
}