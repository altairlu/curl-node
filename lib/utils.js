function isIP(name){
  let re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/
  if (re.test(name)){
    for (let i=1; i<5;i++){
      let key = '$'+String(i)
      if (RegExp[key]>=256){
        throw 'the ip is wrong'
      }
    }
    return true
  }
  return false
}

/**
 * 
 * @param {Any} val the value to tesxt
 * @returns {boolean} 
 */
function isUndefined(val){
  return typeof val === 'undefined'
}
/**
 * @param {Any} val the value to tesxt
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string'
}

module.exports = {
  isString: isString,
  isUndefined: isUndefined,
  isIp: isIP
}