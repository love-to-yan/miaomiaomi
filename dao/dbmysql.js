
const mysql=require("mysql");
const dbpool={
  pool:{},
  config:{
    host:"47.101.131.32",//主机地址
    port:"3306",//端口号
    user:"calvin",
    password:"175747",
    database:"miaomiaomi"
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

function mysql_init (config) {
  console.log(config)
 //dbpool.config = config
 dbpool.create()

  console.log('mysql服务开启')
}
dbpool.create()

module.exports = dbpool