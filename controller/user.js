const dao = require('../dao')
const email = require('../config/email')
const Code = require('./codeController')
const jwt = require('jsonwebtoken')
const tool = require('./tool')
const User = {
  /**
   * 上传用户猫咪信息
   */

  async upload_cat (req, res) {
    try {
      console.log(req.body)
      let head_img = '1.jpg'
      let data = JSON.parse(req.body.data)
      data.head_img = head_img
      let field = [], values = []
      for (let i in data) {
        field.push(i)
        values.push(data[i])
      }
      let _result = await dao.insert({
        table: 'cat',
        field,
        values
      })
      let cat_id = _result.result.insertId
      console.log(cat_id)
    } catch (e) {
      console.log(e)
    }
    res.status(200).send('ok')
  },
  /**
   * 修改信息
   */
  async update (req, res) {

  }
}
module.exports = User