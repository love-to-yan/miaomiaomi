class Limiter {
  constructor(){

  }
}

class ipLimiter extends Limiter {
  _ipArray = []
  constructor(){
    super()
    setInterval(()=>{
      let date = new Date()
      let hours = date.getHours()
      let minutes = date.getMinutes()
      let seconds = date.getSeconds()
      if(hours===0 && minutes ===0 && seconds===0){
        this.clear_array()
      }
    },999)
  }
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