const fs = require('fs')
const util = require('util')
const path = require('path')
module.exports = (name, option) =>{
  let filePath = path.resolve(process.cwd(),name)
  let config = {
    flags: 'w'
  }
  if (typeof option !== 'undefined' && option.encoding){
    config.encoding = option.encoding
  }
  return fs.createWriteStream(filePath, config)
}