const dao = require('../dao')
const email = require('../config/email')
const Code = require('./codeController')
const jwt = require('jsonwebtoken')
const tool = require('./tool')
const User={
  /**
   * 上传用户猫咪信息
   */

  async upload_cat(req,res){
    console.log("upload_cat")
    console.log(req.body)
    res.status(200).send("ok")
  },
  /**
   * 修改信息
   */
  async update(req,res){

  }
}
module.exports=User