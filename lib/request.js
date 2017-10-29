const http = require('http')
const https = require('https')


let request = (config, url) => new Promise((resolve, reject) => {
  let req = http.request({
    protocol: url.protocol,
    host: url.hostname,
    port: url.port,
    method: config.request,
    path: url.pathname
  }, res => {

    if (config.verbose) {

    }
    res.on('error', err => {
      console.log('ERROR!: ', err.message)
    })

    resolve(res)

  })

  req.on('error', err => {
    console.log(err.message)
  })
  if (config.request){
    req.write(config.data)
  }
  url.ip.then(address => {
    if (config.verbose) {
      console.log(`*   Trying ${url.ip}...  port ${url.port} (#0)`)
      console.log(`* Connected to ${url.hostname ? url.hostname : url.ip}(${url.hostname ? url.ip : ''}) port ${url.port} (#0)`)
      console.log(`> ${req.method} ${url.path} ${url.protocol}/${req.httpVersion}`)
      let headers = req.getHeaders()
      for (let key in headers) {
        console.log('>', key, ':', headers[key])
      }
      console.log('>')
    }
    req.end()
  })
})
module.exports = request
