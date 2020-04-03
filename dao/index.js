const con = require('./dbmysql').dbpool
const dao = {
  add_Votes (id,s) {
    console.log('id is ',id)
    // let sql = `update cat set Votes=Votes+1 where idcat = 1;`
    let sql = 'select * from cat;'
    console.log(sql)
    con.connect(sql, (err, data) => {
      if (err) {
        console.log('添加选票失败')
      }else {
        s(null,'ok')
        console.log('添加选票成功\n',data)
      }
    })
  }
}

module.exports = dao