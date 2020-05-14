//express简单搭建服务器
const express = require('express')//加载express
const fs = require('fs')//加载fs
const path = require('path')//加载path
let multipart = require('connect-multiparty')
const multer = require('multer')
//const upload = multer({ dest: 'uploads/' })

//日志
const logger = require('morgan')
//小图标
//const favicon=require("serve-favicon");
//
const bodyParser = require('body-parser')

//引入session和cookies
//const session=require("express-session");
//const cookieParser=require("cookie-parser");

const route = require('./routes')


const app = express()//执行express的全局函数，返回一个express的服务器对象
//设置访问的模板格式

//2.日志模块  ：npm install morgan --save
app.use(logger('dev'))//调用日志模块，（开发）模式

//post数据读取
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(multer({ dest: './uploads/'}).array('image'));
//app.use(multipart({uploadDir:'./uploads' }))
//小图标 ：npm install serve-favicon --save
//app.use(cookieParser());
/*app.use(session({
    name:"ChangQing",
    secret:"11223344",
    cookie:{
        maxAge:1000*60*20//以毫秒为单位,session保存20分钟
    },
    resave:false,//更新session-cookie失效时间
    rolling:true,
    saveUninitialized:false
}));
app.use(favicon(__dirname+"/public/images/favicon.ico"));

 */

app.all('*', function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*')
  //允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type,X-Requested-With,token')
  //跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  res.header('Content-Type', 'application/json;charset=utf-8')
  if (req.method.toLowerCase() === 'options')
    res.send(200)  //让options尝试请求快速结束
  else
    next()
})

//使用路由
app.use(route)

// server_init()
app.set('port', 9100)//设置端口
app.listen(9100, () => {
  console.log('服务器已启动' + app.get('port'))
})