const cat = require('../controller')
const router = require('express').Router()
const multiparty = require('connect-multiparty')()//文件上传插件
const jwt = require('jsonwebtoken')
const connectmultiparty = multiparty
router.get('*', (req, res) => {
  res.send(`<script>
  window.location.href="https://www.miaomiaomi.wang"
</script>`
  )
})
router.post('/guest/*', (req, res,next) => {
  console.log(req.url)
  let method = req.url.substring(7)
  console.log(method)
  console.log(req.body)
  if (cat[method]) {
    cat[method](req, res)
  } else {
    next()
  }
})
router.post('/user/*', (req, res, next) => {
  let token = req.headers.token
  if (token === undefined) {
    res.send(JSON.stringify({
      status: 401,
      msg: '没有token'
    }))
  } else {
    jwt.verify(token, 'miaomiaomi', (err, data) => {
      if (err) {
        res.send(JSON.stringify({
          status: 402,
          msg: 'token错误或过期'
        }))
      } else {
        next()
      }
    })
  }

})
router.post('/user/*',(req,res)=>{
  let method = req.url.substring(6)
  if(cat[method]){
    cat[method](req,res)
  }else {
    res.send(JSON.stringify({
      'statue': 404,
      'msg': '请求错误，请检查url地址'
    }))
  }
})
router.post('*',(req,res)=>{
  res.status(500)
})
module.exports = router