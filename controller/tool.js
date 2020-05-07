const fs = require('fs')

const tool = {
  /*
  * 获取完整的时间 精确到毫秒
  * YYYY-MM-DD  HH:MM:SS.MS
  * 用途：日志
  * */
  get_full_date () {
    let date = new Date()
    let new_date = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
      date.getDate().toString().padStart(2, '0') + '  ' +
      date.getHours().toString().padStart(2, '0') + ':' +
      date.getMinutes().toString().padStart(2, '0') + ':' +
      date.getSeconds().toString().padStart(2, '0') + '.' +
      date.getMilliseconds().toString().padStart(4, '0')
    return new_date
  },
  /*
  * 获取时间戳
  * YYYYMMDDHHMMSSMSMS
  * 用途：唯一文件名*/
  get_date_time () {
    let date = new Date()
    let new_date = date.getFullYear() + '' + (date.getMonth() + 1).toString().padStart(2, '0') + '' +
      date.getDate().toString().padStart(2, '0') + '' +
      date.getHours().toString().padStart(2, '0') + '' +
      date.getMinutes().toString().padStart(2, '0') + '' +
      date.getSeconds().toString().padStart(2, '0') + '' +
      date.getMilliseconds().toString().padStart(4, '0')
    return new_date
  },
  /*
  * 添加日志
  * 日志格式 时间 函数文件 函数名 错误信息
  * */
  add_log({file,method,msg}){
    let data = this.get_full_date()
    let buf = `${buf}\t${file}\t${method}\t${msg}\r\n`
    fs.writeFile('../miaomiaomi.log', buf,{flag:'a'}, function (err) {
      if (err) {
        return console.error(err)
      }
    })
  },
  /*
  * 保存图像
  * type string 图片文件格式
  * images buffer 图片信息
  * */
  save_images({type,image}){
    let file_name = this.get_date_time()
    let buf = `${buf}\t${file}\t${method}\t${msg}\r\n`
    fs.writeFile(`../images/${file_name}.${type}`, image,{flag:'a'}, function (err) {
      if (err) {
        return console.error(err)
      }
    })
  }
}
module.exports = tool