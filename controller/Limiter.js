class Limiter {

}

class ipLimiter extends Limiter {
  _ipArray = []

  ip_limiter (ip, id) {
    let ip_item = this._ipArray.find((item) => {
      return item.ip === ip
    })
    if (ip_item === undefined) {
      this._ipArray.push({ ip, cat_id: [id] })
      return true
    } else {
      if (ip_item.cat_id.indexOf(id) === -1) {
        ip_item.cat_id.push(id)
        return true
      } else {
        return false
      }
      
    }
  }

  clear_array () {
    this._ipArray = []
  }

  get ipArray () {
    return this._ipArray
  }

  set ipArray (ip_array) {

  }
}

module.exports = { ipLimiter: new ipLimiter() }