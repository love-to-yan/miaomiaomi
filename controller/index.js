const dao = require('../dao')
const email = require('../config/email')
const Code = require('./codeController')
const cat = {
  //增加票数
  async add_vote (req, res) {
    let data = JSON.parse(req.body.data)
    let id = data['cat_id']
    let sql = `update cat set votes=votes+1 where cat_id=${id};`
    try {
      console.log(await dao.sql(sql))
      res.send(JSON.stringify({
        state: 'ok',
        result: {}
      }))
    } catch (e) {
      console.log(e)
      res.send(JSON.stringify({
        state: 'err',
        msg: '操作失败，请检查cat_id的正确性',
        result: {}
      }))
    }
  },
  //获取指定数量的喵咪票数信息，用于投票页
  async get_cats_votes (req, res) {
    let data = req.body.data
    let { page, pageSize } = JSON.parse(data)
    try {
      let result = await dao.sql(`select cat.cat_id,cat.name,cat.age,cat.votes,cat.type,CONCAT(images.realm_name,images.list,cat.head_img)as head_img from cat inner join images where cat.images_id =images.images_id limit ${(page - 1) * 10},${pageSize};`
      )
      let result2 = await dao.sql('select count(*) as total from cat;')
      res.send(JSON.stringify({
        state: 'ok',
        result: {
          total: result2.result[0].total,
          data: result.result
        }
      }))
    } catch (e) {
      console.log(e)
      res.send(JSON.stringify({
        state: 'err',
        result: {}
      }))
    }
  },
  //指定获取喵咪详细信息
  async get_cat_info (req, res) {
    let data = JSON.parse(req.body.data)
    let id = data['cat_id']
    try {
      let result = await dao.select({
        table: 'cat',
        where: `cat_id=${id}`
      })
      let { cat_id, name, votes, age, type, sex } = result.result[0]
      res.send(JSON.stringify({
        state: 'ok',
        result: { cat_id, name, votes, age, type, sex }
      }))
    } catch (e) {
      console.log(e)
      res.send(JSON.stringify({
        state: 'err',
        result: {}
      }))
    }
  },
  // 指定cat_id获取喵咪照片
  async get_cat_photo (req, res) {
    let data = JSON.parse(req.body.data)
    let id = data['cat_id']
    try {
      let result = await dao.sql('select CONCAT(images.realm_name,images.list,cat_img.file_name)as addr '
        + 'from images inner join cat_img where cat_img.images_id=images.images_id AND '
        + `cat_img.cat_id=${id} `)
      console.log(result)
      res.send(JSON.stringify(result))
    } catch (e) {
      console.log(e)
      res.send(JSON.stringify({
        state: 'err',
        result: {}
      }))
    }
  },
  // 注册邮箱时发送验证码
  async get_email_code (req, res) {
    let { user_email } = JSON.parse(req.body.data)
    let code = Code.addCode({ type: 'email', user_email })
    email.send(user_email, code)
    res.send(JSON.stringify({
      status: 200
    }))
  },
  //注册用户
  async sign_user (req, res) {
    try {
      let { user_email, code, password } = JSON.parse(req.body.data)
      if (Code.checkCode({
        type: 'email',
        user_email,
        code
      })) {
        console.log('验证通过，继续操作注册账号')

        let result = await dao.insert({
          table: 'user',
          field: ['email', 'password'],
          value: [user_email, password]
        })
        if (result.state === 'ok') {
          res.send(JSON.stringify({
            status: 200,
            msg: '注册成功'
          }))
        } else {
          res.send(JSON.stringify({
            status: 403,
            msg: '注册失败'
          }))
        }
      } else {
        res.send(JSON.stringify({
          status: 403,
          msg: '验证码错误'
        }))
      }
    } catch (e) {
      res.send(JSON.stringify({
        status: 405,
        msg: '数据库错误'
      }))
    }

  },
  //用户登录
  async login (req, res) {
    let {user_email,password} = JSON.parse(req.body.data)
    try{
      let result = await dao.select({
        table:'user',
        where:`email='${user_email}' AND password='${password}'`
      })
      console.log(result)
      if(result.result.length === 1){
        res.send(JSON.stringify({
          status:200,
          msg:'登录成功'
        }))
      }else {
        res.send(JSON.stringify({
          state:'404',
          msg:'用户名密码出错'
        }))
      }
    }catch (e) {
      res.send(JSON.stringify({
        state:'404',
        msg:'用户名密码出错'
      }))
    }
  }
}
module.exports = cat