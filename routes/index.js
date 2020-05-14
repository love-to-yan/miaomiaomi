const Guest = require('../controller/guest')
const User = require('../controller/user')
const router = require('express').Router()
const connectmultiparty = require('connect-multiparty')()//文件上传插件
const jwt = require('jsonwebtoken')
router.get('*', (req, res) => {
  res.send(`<script>
  window.location.href="https://www.miaomiaomi.wang"
</script>`
  )
})
router.post('/test',(req, res,next)=>{
  console.log('test')
  console.log(req.header)
  console.log(req.file)
  next()
})
router.post('/guest/*', (req, res,next) => {
  console.log("收到guest请求，请求参数为")
  console.log(req.body)
  let method = req.url.substring(7)
  if (Guest[method]) {
    Guest[method](req, res)
  } else {
    next()
  }
})
// router.post('/user/*', (req, res, next) => {
//   let token = req.headers.token
//   if (token === undefined) {
//     res.send(JSON.stringify({
//       status: 401,
//       msg: '没有token'
//     }))
//   } else {
//     jwt.verify(token, 'miaomiaomi', (err, data) => {
//       if (err) {
//         res.send(JSON.stringify({
//           status: 402,
//           msg: 'token错误或过期'
//         }))
//       } else {
//         next()
//       }
//     })
//   }
//
// })
router.post('/user/*',connectmultiparty,(req,res)=>{
  console.log("user请求")
  console.log(req.body)
  let method = req.url.substring(6)
  console.log("user请求",method)
  if(User[method]){
    User[method](req,res)
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