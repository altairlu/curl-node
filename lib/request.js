const http = require('http')
const https = require('https')

let _request = (config, url) => new Promise((resolve, reject) => {
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
    res.on('end', () => {
      // console.log('==== end ====')
    })
    resolve(res)

  })

  req.on('error', err => {
    console.log(err.message)
  })
  req.end()
})

async function Request(config) {
  let res = await _request(config, config.url)
  // res.setEncoding('utf8')
  
  if (config.include) {
    console.log('HTTP/'+res.httpVersion, res.statusCode, res.statusMessage)
    for (let key in res.headers){
      console.log(key+':', res.headers[key])
    }
  }
  let writeStream = process.stdout
  if (config.output){
    writeStream = require('./filestream')(config.output)
  }
  res.pipe(writeStream)

  // res.on('data', chunk => {

  //   process.stdout.write(chunk)
  // })

}

module.exports = Request