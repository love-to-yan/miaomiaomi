const mysql = require('mysql')
const dbpool = {
  pool: {},
  config: {
    host: 'localhost',//主机地址
    port: '3306',//端口号
    user: 'calvin',
    password: '175747',
    database: 'miaomiaomi',
    timezone: "08:00"
  },
  create () {
    this.pool = mysql.createPool(this.config)
  },
  connect (sql, arr, fn) {//sql语句，参数，回调函数
    let arrType = typeof arr
    if (arrType == 'function') {
      fn = arr
      arr = []
    }
    this.pool.getConnection((err, connection) => {
      connection.query(sql, arr, fn)//[]
      connection.release()
    })
  }
}
function mysql_init(){
  let sql = 'select * from cat;'
  dbpool.connect(sql,(err,data)=>{
    if(err){
      console.log(err)
    }else {
      console.log(data)
    }
  })

}

dbpool.create()
module.exports = dbpool