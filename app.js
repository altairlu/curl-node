
const config = require('./lib/argv')
const Url = require('./lib/url')
const request = require('./lib/request')
const Log = require('./lib/log')
const createFileStream = require('./lib/filestream')
const utils = require('./lib/utils')
let url = new Url(config.url,{
  verbose: config.verbose
})
config.url = url

let log

/**
 * 根据字符串生成相应的空格，保持对齐
 * @param {String} str 
 * @param {Object} option
 */
let writeBlank = (str, option = {}) => {
  if (utils.isUndefined(option.blankLength)) {
    option.blankLength = 15
  }
  const Blank = Array(option.blankLength).fill(' ').join('')

  if (option.location === 'before'){
    return Blank.substr(str.length) + str
  } else {
    return str + Blank.substr(str.length)
  }
  
}

/**
 * 通过打退格符刷新输出
 * @param {String} str Output String
 * @param {Int} lastLength The length of last output String
 * @return {Int} The length of String this time
 */
function freshWrite(str, lastLength) {
  let backspace = Array(lastLength).fill('\b').join('')
  process.stdout.write(backspace)
  process.stdout.write(str)
  return str.length
}
/**
 * The default
 * @param {Object} res the response of request
 */
function writeToShell(res) {
  if (config.include || config.verbose) {
    let headString = ''
    if (config.verbose) headString = '< '
    console.log(headString+'HTTP/' + res.httpVersion, res.statusCode, res.statusMessage)
    for (let key in res.headers) {
      console.log(writeBlank(headString+key + ':'), res.headers[key])
    }
    console.log(headString)
  }

  res.pipe(process.stdout)
 
}
/**
 * curl -o [FILE]
 * @param {Object} res the response of request
 */
function writeToFile(res) {
  res.pipe(createFileStream(config.output))
  let startTime = Date.now()
  let total = res.headers['content-length']
  let received = 0

  //show progress

  process.stdout.write(`${writeBlank('Total')}${writeBlank('Received')}\n`)
  let lastWriteLength = 0

  //定时显示进度
  let intervalTask = () => {
    lastWriteLength = freshWrite(
      `${writeBlank(total)}${writeBlank(received)}`,
      lastWriteLength
    )
  }
  let freshWriteTime = setInterval(intervalTask, 1000)

  res.on('data', chunk => {
    received += chunk.length
    log.write('receive date - ' + chunk.length)
  })

  res.on('end', () => {
    //进度更新到最后
    clearInterval(freshWriteTime)
    intervalTask()

    let usedTime = Date.now() - startTime
    if (config.output) {
      process.stdout.write('\nFinished')
    }
    log.write(`Received - ${received} -- Used Time - ${usedTime}`)
  })

}


async function Request() {
  let res = await request(config, config.url)

  log = new Log({
    headers: res.headers,
    url: config.url.href
  })


  // log the status
  let logString = ` --headers ${res.statusCode} ${res.statusMessage} \n`
  for (let key in res.headers) {
    logString = logString.concat(`-${writeBlank(key+':')}${res.headers[key]}\n`)
  }
  log.write(logString.concat('\n'))

  //Determine the action
  if (config.output) {
    writeToFile(res)
  } else {
    writeToShell(res)
  }

}

Request()