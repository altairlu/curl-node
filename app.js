const http = require('http')
const CONFIG = require('./lib/argv')
const Url = require('./lib/url')


let url = new Url(CONFIG.url)
console.log(url)

let req = http.request({
  protocol: url.protocol,
  host: url.hostname,
  port: url.port,
  method: 'GET',
  path: url.pathname
}, res=>{
  console.log(res.statusCode)
  console.log(res.message)
  res.setEncoding('utf8')
  res.on('data', chunk => process.stdout.write(chunk))

  res.on('end',()=>{
    console.log('==== end ====')
  })
  res.on('error', err=>{
    console.log('ERROR!: ',err.message)
  })
})

req.on('error', err=>{
  console.log(err.message)
})
req.end()