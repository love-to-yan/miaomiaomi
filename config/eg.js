const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()
app.use(logger('dev'))//调用日志模块，（开发）模式
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.all('*', function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*')
  //允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type,X-Requested-With,token')
  //跨域允许的请求方式

  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  res.header('Content-Type', 'application/json;charset=utf-8')
  res.header('X-Powered-By', ' 3.2.1')
  if (req.method.toLowerCase() === 'options')
    res.send(200)  //让options尝试请求快速结束
  else
    next()
})
app.post('/user', (req, res, next) => {

  let { email } = req.body
  console.log(email)
  let token = jwt.sign({ email }, 'miaomiaomi', { expiresIn: 10 })
  res.send(JSON.stringify({
    status: 200,
    token
  }))

})
app.use('/token', (req, res, next) => {
  console.log(req.headers.token)
  res.send(JSON.stringify({
    a:'token'
  }))
  // let {token} = req.body
  // jwt.verify(token, 'miaomiaomi', function (err, data) {
  //   if (err) {console.log(err)
  //     res.send(JSON.stringify(err)) }
  //   console.log('解析的数据', data)
  //   res.send(JSON.stringify(data))
  // })
})
app.set('port', 9000)//设置端口
app.listen(9000, () => {
  console.log('服务器已启动' + app.get('port'))
})