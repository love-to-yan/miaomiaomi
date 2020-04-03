const cat = require('../controller')
const router = require('express').Router();
const multiparty=require("connect-multiparty");//文件上传插件
const connectmultiparty=multiparty();
router.get('*.do',(req,res)=>{
  console.log('接收到get请求')
})
router.post('*.do',(req,res)=>{
  console.log('接收到post请求')
  console.log(req.body)
  let method = req.body.method
   cat[method](req,res)
  res.send('收到了')
})
module.exports = router