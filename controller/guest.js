const dao = require('../dao')
const email = require('../config/email')
const Code = require('./codeController')
const jwt = require('jsonwebtoken')
const tool = require('./tool')
const Guest = {
  //增加票数
  async add_vote (req, res) {
    let data = req.body
    let id = data['cat_id']
    let sql = `update cat set votes=votes+1 where cat_id=${id};`
    try {
      await dao.sql(sql)

    } catch (e) {
      tool.add_log({
        file: `controller\\index.js`,
        method: 'add_vote',
        msg: JSON.stringify(e)
      })
      res.send(JSON.stringify({
        status: 410,
        msg: '操作失败，请检查cat_id的正确性'
      }))
      return false
    }
    res.send(JSON.stringify({
      status: 200
    }))
  },
  //获取指定数量的喵咪票数信息，用于投票页
  async get_cats_votes (req, res) {
    let data = req.body
    let { page, pageSize } = data
    try {
      let result = await dao.sql(`select cat.cat_id,cat.name,cat.age,cat.votes,cat.type,CONCAT(images.realm_name,images.list,cat.head_img)as head_img from cat inner join images where cat.images_id =images.images_id limit ${(page - 1) * pageSize},${pageSize};`
      )
      let result2 = await dao.sql('select count(*) as total from cat;')
      res.send(JSON.stringify({
        status: 200,
        result: {
          total: result2[0].total,
          data: result
        }
      }))
    } catch (e) {
      tool.add_log({
        file: `controller\\index.js`,
        method: 'get_cats_votes',
        msg: JSON.stringify(e)
      })
      res.send(JSON.stringify({
        status: 505,
        msg: '后台错误'
      }))
    }
  },
  //指定获取喵咪详细信息 输入id
  async get_cat_info (req, res) {
    let data = req.body
    let id = data['cat_id']
    try {
      let _cat_info = dao.select({
        table: 'cat',
        where: `cat_id=${id}`
      })

      let _head_img = dao.sql('select cat.user_id,CONCAT(images.realm_name,images.list,cat.head_img)as head_img from cat inner join images' +
        ` where cat.images_id = images.images_id and cat.cat_id=${id};`)
      let _images = dao.sql('select CONCAT(images.realm_name,images.list,cat_img.file_name)as img_url from cat_img inner join images' +
        ` where cat_img.images_id = images.images_id and cat_img.cat_id=${id};`)
      let { head_img, user_id } = (await _head_img)[0]
      console.log(head_img, user_id)
      let _user_name = dao.select({
        table: 'user',
        field: 'name as user_name',
        where: `user_id=${user_id}`
      })
      let img_url = []
      let indexOf = 0
      let images = await _images
      for (let i = 0; i < images.length; i++) {
        img_url[i] = images[i]['img_url']
        if (img_url[i] === head_img) indexOf = i
      }
      img_url.splice(indexOf, 1)
      let {
        cat_id, name, votes, age, type, sex, breed_info, temperament_info,
        living_habits, shape, upload_date
      } = (await _cat_info)[0]
      let { user_name } = (await _user_name)[0]
      res.send(JSON.stringify({
        status: 200,
        result: {
          cat_id, name, votes, age, type, sex, breed_info, temperament_info,
          living_habits, shape, head_img, img_url, upload_date, user_name
        }
      }))
    } catch (e) {
      console.log(e)
      tool.add_log({
        file: `controller\\index.js`,
        method: 'get_cat_info',
        msg: JSON.stringify(e)
      })
      res.send(JSON.stringify({
        status: 505,
        msg: '检查cat_id'
      }))
    }
  },
  // 指定cat_id获取喵咪照片
  async get_cat_photo (req, res) {
    let data = JSON.req.body
    let id = data['cat_id']
    try {
      let result = await dao.sql('select CONCAT(images.realm_name,images.list,cat_img.file_name)as addr '
        + 'from images inner join cat_img where cat_img.images_id=images.images_id AND '
        + `cat_img.cat_id=${id} `)
      console.log(result)
      res.send(JSON.stringify(result))
    } catch (e) {
      tool.add_log({
        file: `controller\\index.js`,
        method: 'get_cat_photo',
        msg: JSON.stringify(e)
      })
      res.send(JSON.stringify({
        status: 505,
        msg: '检查cat_id值'
      }))
    }
  },
  // 注册邮箱时发送验证码
  async get_email_code (req, res) {
    let { user_email } = req.body
    let code = Code.addCode({ type: 'email', user_email })
    email.send(user_email, code)
    res.send(JSON.stringify({
      status: 200
    }))
  },
  //注册用户
  async sign_user (req, res) {
    try {
      let { user_email, user_name,code, password } = req.body
      if (Code.checkCode({
        type: 'email',
        user_email,
        code
      })) {
        console.log('验证通过，继续操作注册账号')
        await dao.insert({
          table: 'user',
          field: ['email', 'password', 'name'],
          value: [user_email, password, user_name]
        })
        res.send(JSON.stringify({
          status: 200,
          msg: '注册成功'
        }))
      } else {
        res.send(JSON.stringify({
          status: 420,
          msg: '验证码错误'
        }))
      }
    } catch (e) {
      tool.add_log({
        file: `controller\\index.js`,
        method: 'sign_user',
        msg: JSON.stringify(e)
      })
      res.send(JSON.stringify({
        status: 505,
        msg: '数据库错误'
      }))
    }

  },
  //用户登录
  async login (req, res) {
    let { user_email, user_password } = req.body
    try {
      let result = await dao.select({
        table: 'user',
        where: `email='${user_email}' AND password='${user_password}'`
      })
      if (result.length === 1) {
        let token = jwt.sign({ user_email }, 'miaomiaomi', { expiresIn: '48h' })
        res.send(JSON.stringify({
          status: 200,
          token,
          data:result[0]
        }))
      } else {
        res.send(JSON.stringify({
          status: 408,
          msg: '用户名密码出错'
        }))
      }
    } catch (e) {
      tool.add_log({
        file: `controller\\index.js`,
        method: 'login',
        msg: JSON.stringify(e)
      })
      res.send(JSON.stringify({
        status: 409,
        msg: '用户名密码出错'
      }))
    }
  },
  //修改密码
  async update_password (req, res) {
    try {
      let { user_email, user_password, code } = req.body
      let result = {}
      if (Code.checkCode({
        type: 'email',
        user_email,
        code
      })) {
        result = await dao.update({
          table: 'user',
          field: 'password',
          value: user_password,
          where: `email='${user_email}'`
        })
        res.send(JSON.stringify({
          status: 200
        }))
      } else {
        res.send(JSON.stringify({
          status: 420,
          msg: '验证码错误'
        }))
      }
    } catch (e) {
      console.log(e)
      res.send(JSON.stringify({
        status: 500,
        msg: '后台更新数据错误'
      }))
    }
  }
}
module.exports = Guest