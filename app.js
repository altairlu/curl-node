
const config = require('./lib/argv')
const Url = require('./lib/url')
const request = require('./lib/request')

let url = new Url(config.url)
config.url = url

request(config)

