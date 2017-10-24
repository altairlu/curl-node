const http = require('http')
const https = require('https')
const createFileStream = require('./filestream')
const Log = require('./log')
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
    
    resolve(res)

  })

  req.on('error', err => {
    console.log(err.message)
  })
  req.end()
})

async function Request(config) {
  let res = await _request(config, config.url)
  log = new Log({
    headers: res.headers,
    url: config.url.href
  })
  if (config.include) {
    console.log('HTTP/'+res.httpVersion, res.statusCode, res.statusMessage)
    for (let key in res.headers){
      console.log(key+':', res.headers[key])
    }
  }

  // log the status
  let logString = ` --headers ${res.statusCode} ${res.statusMessage} \n`
  for (let key in res.headers){
    logString = logString.concat(`-${key}:${'                 '.substr(key.length)} ${res.headers[key]}\n`)
  }
  log.write(logString.concat('\n'))

  let writeStream = process.stdout
  if (config.output){
    writeStream = createFileStream(config.output)
  }
  res.pipe(writeStream)

  let startTime = Date.now()
  let total = res.headers['content-length']
  let received = 0
  res.on('data', chunk => {
    received += chunk.length
    log.write('receive date - '+ chunk.length)
  })
  res.on('end', () => {
    let usedTime = Date.now() - startTime
    if (config.output){
      process.stdout.write('Received - '+ received)
    }
    log.write(`Received - ${received} -- Used Time - ${usedTime}`)
  })

}

module.exports = Request