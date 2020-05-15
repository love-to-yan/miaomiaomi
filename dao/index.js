const con = require('./dbmysql')
const dao = {
  add_Votes (id, s) {
    console.log('id is ', id)
    // let sql = `update cat set Votes=Votes+1 where idcat = 1;`
    let sql = 'SELECT * FROM cat'
    console.log(sql)
    con.connect(sql, [], (err, data) => {
      if (err) {
        console.log('添加选票失败')
      } else {
        s(null, 'ok')
        console.log('添加选票成功\n', data)
      }
    })
  },
  /*
  * insert 插入数据 返回操作结果
  * param obj 参数
  * table string 表名
  * field 数组 列名
  * values 数组 值
  * */
  insert (param) {
    return new Promise((resolve, reject) => {
      let sql = 'INSERT INTO '
      let values = []
      if (param.table !== undefined) {
        sql += param.table
      } else {
        console.log('没有表名，出错 /dao/index.js/insert')
        reject({
          err: 0,
          msg: '没有表名，出错 /dao/index.js/insert'
        })
        return false
      }
      if (param.field !== undefined) {
        if (param.field.length === 0) {
          console.log('列名为空 ，出错 /dao/index.js/insert')
          reject({
            err: 0,
            msg: '列名为空 ，出错 /dao/index.js/insert'
          })
          return false
        } else {
          sql += ' ('
          for (let i = 0; i < param.field.length; i++) {
            sql = sql + param.field[i] + ','
          }
          sql = sql.substr(0, sql.length - 1)
          sql += ' ) VALUES ( '
        }
      } else {
        console.log('没有列名 ，出错 /dao/index.js/insert')
        reject({
          err: 0,
          msg: '没有列名 ，出错 /dao/index.js/insert'
        })
        return false
      }
      if (param.values !== undefined) {
        if (param.values.length === 0) {
          console.log('列值为空 ，出错 /dao/index.js/insert')
          reject({
            err: 0,
            msg: '列值为空 ，出错 /dao/index.js/insert'
          })
          return false
        } else {
          for (let i = 0; i < param.values.length; i++) {
            sql += '?,'
            values[i] = param.values[i]
          }
          sql = sql.substr(0, sql.length - 1)
          sql += ');'
        }
      } else {
        console.log('没有列值 ，出错 /dao/index.js/insert')
        reject({
          err: 0,
          msg: '没有列值 ，出错 /dao/index.js/insert'
        })
        return false
      }
      console.log(sql)
      con.connect(sql, values, (err, result) => {
        if (err) {
          reject(err)
          return false
        } else {
          resolve(result)
        }

      })
    })

  },
  /**
   * select 查询 返回查询数据
   * param 参数
   * table string 表名
   * field 数组 列名 没有默认为*
   * where string 条件
   * limit string 记录行
   * */
  select (param) {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT'
      if (param.field !== undefined) {
        if (typeof param.field === 'object' && param.field.length>0 ) {
          for (let i = 0; i < param.field.length; i++) {
            sql += ` ${param.field[i]},`
          }
        }
        if (typeof param.field === 'string'){
          sql += ` ${param.field},`
        }
          //删除掉多余的','
          sql = sql.substr(0, sql.length - 1)
        sql += ' FROM '
      } else {
        sql += ' * FROM '
      }
      if (param.table !== undefined) {
        sql += param.table
      } else {
        console.log('没有表名，出错 /dao/index.js/select')
        reject({
          err: 0,
          msg: '没有表名，出错 /dao/index.js/select'
        })
        return false
      }
      if (param.where !== undefined) {
        sql = sql + ' WHERE ' + param.where
      }
      if (param.limit !== undefined) {
        sql = sql + ' LIMIT ' + param.limit
      }
      sql += ';'
      console.log(sql)
      con.connect(sql, (err, result) => {
        console.log(result)
        if (err) {
          reject(err)
          return false
        } else {
          resolve(result)
        }
      })
    })
  },
  /**
   * update 更新 修改数据
   * param 参数
   * table string 表名
   * field 数组/string 列名 field 和value类型应该保持一致
   * value 数组/string 值
   * where string 条件
   */
  /**
   * @description update 更新 修改数据
   * @param {Object} param
   * 传入的参数
   **/
  /**
   /**
   * @example
   * update({
   *   table:'user',
   *   field:'password',
   *   value:'123456'
   *   where:'email=1757478118@qq.com'
   * });
   **/
  update (param) {
    return new Promise((resolve, reject) => {
      let sql = 'update'
      let value = []
      if (param.table !== undefined) {
        sql = sql + ` ${param.table} set`
      }
      if (typeof param.field === typeof param.value) {
        let flag = true
        if (typeof param.field === 'string') {
          flag = false
          sql = sql + ` ${param.field}=?`
          value[0] = param.value
        }
        if (typeof param.field === 'object' && param.field.length === param.value.length) {
          flag = false
          for (let i = 0; i < param.field.length; i++) {
            sql = sql + ` ${param.field[i]}=?,`
            value[i] = param.value[i]

          }
          sql = sql.substr(0, sql.length - 1)
        }
        if (flag) {
          reject({
            err: 0,
            msg: '列名或列值类型出错。field 和value只能同时为string 或同时为数组，为数组时数组长度一致 ，出错 /dao/index.js/update'
          })
        }
      }
      if (param.where !== undefined) {
        sql += ` where ${param.where};`
      }
      console.log(sql)
      con.connect(sql, value, (err, result) => {
        if (err) {
          console.log(err)
          reject(err)
          return false
        } else {
          resolve(result)
        }
      })
    })
  },
  /**
   * */
  delete (param) {
    return new Promise((resolve, reject) => {
      let sql = 'delete from'
      if (param.table !== undefined) {
        sql = sql + ` '${param.table}'`
      } else {

      }
      if (param.where !== undefined) {
        sql = sql + ` ${param.where};`
      } else {

      }
      con.connect(sql, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  /**
   *在遇到需要函数或者联合查询时，直接输入完整的sql语句进行查询
   **/
  sql (sql) {
    return new Promise((resolve, reject) => {
      con.connect(sql, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}

module.exports = dao