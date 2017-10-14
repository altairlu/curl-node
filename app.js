const process = require('process')
const http = require('http')
const program = require('commander')

program
  .version('0.0.1')
  .usage('[options...] <url>')
  // .option('-p, --parpers', 'Add peppers')
  // .option('-u, --ufos', 'dsalkfndiovnsd')
  // .option('-c, --cheese-daf [type]', 'dnfaolnvdochjdsoa')
  .parse(process.argv)

let url = program.args[0]
// check(url)
http.get({
  hostname: url,
  port: 80,
  path: '/',
  agent: false
}, res=>{
  res.setEncoding('utf8')
  res.on('data', chunk => process.stdout.write(chunk))
  res.on('end',()=>{
    console.log('end')
  })
})