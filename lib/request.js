const http = require('http')
const https = require('https')


let request = (config, url) => new Promise((resolve, reject) => {
  let req = http.request({
    protocol: url.protocol,
    host: url.hostname,
    port: url.port,
    method: 'GET',
    path: url.pathname
  }, res => {

    res.on('error', err => {
      console.log('ERROR!: ', err.message)
    })
    
    resolve(res)

  })

  req.on('error', err => {
    console.log(err.message)
  })
  req.end()
})
module.exports = request
