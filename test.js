const url = require('url')
const {URL} = url
const urlString = "https://user:pass@www.baidu.com:8080/search?qqq=123&yyy=true#hash"

const test = [
  "https://user:pass@www.baidu.com:8080/search?qqq=123&yyy=true#hash",
  "http://www.baidu.com",
  "http://www.baidu.com/"
]
const fields = ["href", "protocol", "username", "password", "hostname", "port", "pathname", "search", "hash"]
const REG = /^(?:([A-Za-z]+):)?(?:\/{0,3})(?:([A-Za-z0-9]+)?:([A-Za-z0-9]+)@)?([\dA-Za-z.\-]+)(?:\:(\d+))?(\/[^?#]*)?(\?[^#]+)?(?:#(.*))?$/
const blank = '        '
test.forEach(url=>{
  result = REG.exec(url)
  fields.forEach((field, i)=>{
    console.log(`${field}:${blank.substr(field.length)}${result[i]}`)
  })
  console.log('=========')
})