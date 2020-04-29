const cat = require('../controller')
const router = require('express').Router()
const multiparty = require('connect-multiparty')()//文件上传插件
const jwt = require('jsonwebtoken')
const connectmultiparty = multiparty

router.get('*', (req, res) => {
  res.status(500).send(JSON.stringify({
    'status':500,
    'msg':'api接口不支持get访问方式'
  }))
})
router.post('/guest', (req, res) => {
  console.log(req.body)
  let method = req.body.method
  if (method !== undefined && cat[method] !== undefined) {
    cat[method](req, res)
  } else {
    res.send(JSON.stringify({
      statue: 404,
      msg: 'method错误或无method',
      result:{}
    }))
  }
})
router.post('/user',(req,res,next)=>{
  let token = req.headers.token
  if(token === undefined){
    res.send(JSON.stringify({
      status:401,
      msg:'没有token'
    }))
  }else {
    jwt.verify(token,'miaomiaomi',(err,data)=>{
      if(err){
        res.send(JSON.stringify({
          status:402,
          msg:'token错误或过期'
        }))
      }else {
        next()              
      }
    })
  }

})
module.exports = router