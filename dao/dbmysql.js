
const mysql=require("mysql");
const dbpool={
  pool:{},
  config:{
    host:"127.0.0.1",//主机地址
    port:"3306",//端口号
    user:"root",
    password:"root",
    database:"car"
  },
  create(){
    this.pool=mysql.createPool(this.config);
  },
  connect(sql,arr,fn){//sql语句，参数，回调函数
    let arrType=typeof arr;
    if(arrType === "function"){
      fn=arr;
      arr=[];
    }
    this.pool.getConnection((err,connection)=>{
      connection.query(sql,arr,fn);//[]
      connection.release();
    })
  }
};
dbpool.create()

function mysql_init (config) {
  console.log(config)
 // dbpool.config = config
 // dbpool.create()
  let sql = 'select * from adcar'
  dbpool.connect(sql,[],(err,data)=>{
    if (err){
      console.log('555')
    }else {
      console.log('666')
    }
  })
  console.log('mysql服务开启')
}

module.exports = {
  'dbpool':dbpool,
  'mysql_init':mysql_init
}