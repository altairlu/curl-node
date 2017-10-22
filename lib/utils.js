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
  isUndefined: isUndefined
}