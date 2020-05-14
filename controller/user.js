const dao = require('../dao')
const email = require('../config/email')
const Code = require('./codeController')
const jwt = require('jsonwebtoken')
const tool = require('./tool')
const  multiparty = require('multiparty')
const User = {
  /**
   * 上传用户猫咪信息
   */

  async upload_cat (req, res) {
    try {
      let form = new multiparty.Form({ uploadDir: './uploads' });
      form.parse(req, function(err, fields, files) {
        console.log(fields, files,' fields2')
        if (err) {
          console.log(err)
        } else {
          res.json({ imgSrc: files.image[0].path })
        }
      });
      console.log("req.body.imgs",req.body.imgs)
      console.log("req.body.imgs[0]",req.body.imgs[0])
      console.log("req.body.headIcon",req.body.headIcon[0])
      console.log("req.body.obj",req.body.obj)
      console.log("req.body",req.body)

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