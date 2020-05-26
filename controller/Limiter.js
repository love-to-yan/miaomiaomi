class Limiter {

}

class ipLimiter extends Limiter {
  _ipArray = []

  ip_limiter (ip) {
    if (this._ipArray.indexOf(ip) === -1) {
      this._ipArray.push(ip)
      return true
    } else {
      return false
    }
  }
  clear_array(){
    this._ipArray=[]
  }
  get ipArray () {
    return this._ipArray
  }

  set ipArray (ip_array) {

  }
}

module.exports = { ipLimiter: new ipLimiter() }