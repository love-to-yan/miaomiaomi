const dao = require('../dao')
const email = require('../config/email')
const Code = require('./codeController')
const jwt = require('jsonwebtoken')
const tool = require('./tool')
const multiparty = require('multiparty')
const  fs = require('fs')
const MIME_type = {
  'image/png': '.png',
  'image/bmp': '.bmp',
  'image/gif': '.gif',
  'image/jpeg': '.jpg'
}
const User = {
  /**
   * 上传用户猫咪信息
   */

  async upload_cat (req, res) {
    try {
      //获取上传参数
      let data = JSON.parse(req.body.data)
      let field = [], values = []
      //喵咪图片保存地址
      let _path_cat_photo = '/var/www/miaomiaomi-html/image/miao/cat_photo/'
      //喵咪头像保存地址
      let _path_head_img = '/var/www/miaomiaomi-html/image/miao/head_img/'
      let _cat_photo_result = []
      //文件类型
      let file_type
      //文件名
      let _file_name
      for (let i in data) {
        field.push(i)
        values.push(data[i])
      }
      let _result = await dao.insert({
        table: 'cat',
        field,
        values
      })
      //获取新增喵咪记录的cat_id
      let cat_id = _result.insertId
      console.log(cat_id)
      //遍历req.files数组，获取图片信息
      for (let _name in req.files) {
        for (let i = 0; i < req.files[_name].length; i++) {
          file_type = MIME_type[req.files[_name][i].mimetype]
          _file_name = req.files[_name][i].filename + file_type
          if (_name === 'head_img') {
            fs.rename(req.files[_name][i].path, _path_head_img + req.files[_name][i].filename + file_type, function (err, doc) {
              if (err) {
                console.error(err)
                tool.add_log({
                  file: `controller\\user.js`,
                  method: 'upload_cat',
                  msg: JSON.stringify(err)
                })
              } else {
                _cat_photo_result.push(dao.insert({
                  table:'cat_img',
                  field:['cat_id','images_id','file_name'],
                  values:[cat_id,1,req.files[_name][i].filename+ file_type]
                }))
                _cat_photo_result.push(dao.update({
                  table:'cat',
                  field:['images_id','head_img'],
                  value:[1,req.files[_name][i].filename+ file_type],
                  where:`cat_id=${cat_id}`
                }))
                _cat_photo_result.push(dao.sql(`update cat set upload_date = now() where cat_id=${cat_id}; `))
              }
            })
          } else {
            fs.rename(req.files[_name][i].path, _path_cat_photo + req.files[_name][i].filename + file_type, function (err, doc) {
              if (err) {
                console.error(err)
                tool.add_log({
                  file: `controller\\user.js`,
                  method: 'upload_cat',
                  msg: JSON.stringify(err)
                })
              } else {
                _cat_photo_result.push(dao.insert({
                  table:'cat_img',
                  field:['cat_id','images_id','file_name'],
                  values:[cat_id,2,req.files[_name][i].filename+ file_type]
                }))
              }
            })
          }

        }
      }

    } catch (e) {
      console.log(e)
      tool.add_log({
        file: `controller\\user.js`,
        method: 'upload_cat',
        msg: JSON.stringify(err)
      })
      res.send(JSON.stringify({
        status:300,
      }))
      return  false
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