const { URLSearchParams } = require('url')
const Util = require('./utils')

const FIELDS = ["href", "protocol", "username", "password", "hostname", "port", "pathname", "search", "hash"]
const Default_Port = {
  'http:': 80,
  'https:': 80,
  'ftp:': 21,
  'telnet:': 23
}
const REG = /^([A-Za-z]+:)?(?:\/{0,3})(?:([A-Za-z0-9]+)?:([A-Za-z0-9]+)@)?([\dA-Za-z.\-]+)(?:\:(\d+))?(\/[^?#]*)?(\?[^#]+)?(?:#(.*))?$/

function Url(url) {
  if (!(this instanceof Url)) {
    return new Url(url)
  }
  if (!Util.isString(url)) {
    throw 'param is not string!'
  }

  let result = REG.exec(url)
  FIELDS.forEach((field, i)=>this[field] = result[i] || '')

  if (!this.protocol){
    this.protocol = 'http:'
  } else {
    this.protocol = this.protocol.toLowerCase()
  }
  
  this.hostname = this.hostname.toLowerCase()
  if (this.port){
    this.port = Number(this.port)
  } else {
    this.port = Default_Port[this.protocol]
  }

  if (!this.pathname){
    this.pathname = '/'
  }
}

module.exports = Url
