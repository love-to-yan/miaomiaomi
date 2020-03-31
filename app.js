//express简单搭建服务器
const express=require("express");//加载express
//日志
const logger=require("morgan");
//小图标
//const favicon=require("serve-favicon");
//
const bodyParser=require("body-parser");

const path=require('path');
//引入session和cookies
//const session=require("express-session");
//const cookieParser=require("cookie-parser");

//const route=require("./routes/index");

const app=express();//执行express的全局函数，返回一个express的服务器对象
//设置访问的模板格式

//2.日志模块  ：npm install morgan --save
app.use(logger("dev"));//调用日志模块，（开发）模式

//post数据读取
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());



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
//使用路由
//app.use(route);
// 1.设置静态资源路径
//app.use(express.static(__dirname));
//app.use(express.static(__dirname+"/public"));//__dirname指向当前文件根目录
//app.use(express.static(__dirname+"/public/html"));

app.set("port",9100);//设置端口
app.listen(9100,()=>{
    console.log("服务器已启动"+app.get("port"));
});
app.get('/*.do',(req, res, next)=>{
    console.log("被访问了")
    res.send("hi 虎儿")
})
