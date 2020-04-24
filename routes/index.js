const cat = require('../controller')
const router = require('express').Router()
const multiparty = require('connect-multiparty')()//文件上传插件
const connectmultiparty = multiparty

router.get('*.do', (req, res) => {
  console.log('接收到get请求')
  res.send('err')
})
router.post('/guest', (req, res) => {
  console.log('接收到post请求 guest')
  console.log(req.body)
  let method = req.body.method
  if (method !== undefined && cat[method] !== undefined) {
    cat[method](req, res)
  } else {
    res.send(JSON.stringify({
      state: 'err',
      msg: 'method错误或无method',
      result:{}
    }))
  }
})
module.exports = router