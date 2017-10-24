const createFileStream = require('./filestream')

let stream = createFileStream(`./logs/${Date.now()}.log`,{encoding: 'utf8'})

class Log{
  constructor(option){
    this.stream = stream
    this.timeline = []
    // this.total = option.total
    this.write(`new Request -- ${option.url}\n`)
  }
  write(str){
    let nowTime = (new Date()).toString()
    let writeStr = (`\t\t-- ${nowTime} - ${str}\t\n`)
    this.timeline.push({
      time: nowTime,
      info: str
    })
    this.stream.write(writeStr)
  }
}

module.exports = Log