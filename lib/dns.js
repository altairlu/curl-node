const dns = require('dns')

module.exports = (hostname)=>new Promise((resolve, reject)=>{
  dns.lookup(hostname, 4,(err, address)=>{
    if (err){
      reject(err)
    } else {
      resolve(address)
    }
  })
})