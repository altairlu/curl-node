const { URLSearchParams } = require('url')
const FindIp = require('./dns')
const Utils = require('./utils')

const FIELDS = ["href", "protocol", "username", "password", "hostname", "port", "pathname", "search", "hash"]
const Default_Port = {
  'http:': 80,
  'https:': 80,
  'ftp:': 21,
  'telnet:': 23
}
const REG = /^([A-Za-z]+:)?(?:\/{0,3})(?:([A-Za-z0-9]+)?:([A-Za-z0-9]+)@)?([\dA-Za-z.\-]+)(?:\:(\d+))?(\/[^?#]*)?(\?[^#]+)?(?:#(.*))?$/

function Url(url, option = {}) {
  if (!(this instanceof Url)) {
    return new Url(url)
  }
  if (!Utils.isString(url)) {
    throw 'param is not string!'
  }
  let result = REG.exec(url)
  FIELDS.forEach((field, i) => this[field] = result[i] || '')

  if (!this.protocol) {
    this.protocol = 'http:'
  } else {
    this.protocol = this.protocol.toLowerCase()
  }

  if (Utils.isIp(this.hostname)) {
    this.ip = Promise.resolve(this.hostname)
  } else {
    this.ip = FindIp(this.hostname).catch(err => {
      if (config && config.verbose) {
        console.log('timeout on name lookup is not supported')
      }
      return null
    })
  }

  this.hostname = this.hostname.toLowerCase()
  if (this.port) {
    this.port = Number(this.port)
  } else {
    this.port = Default_Port[this.protocol]
  }

  if (!this.pathname) {
    this.pathname = '/'

    if (option.verbose) {
      console.log(`* Rebuilt URL to: ${this.hostname}${this.pathname}`)
    }
  }
}

module.exports = Url
