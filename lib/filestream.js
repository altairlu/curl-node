const fs = require('fs')
const util = require('util')
const path = require('path')
module.exports = name =>{
  let filePath = path.resolve(process.cwd(),name)
  console.log('output path:', filePath)
  return fs.createWriteStream(filePath, {
    flags: 'w',
    encoding: 'utf8',
  })
}