const dao = require('../dao')
const cat = {
  /*
  * 增加票数*/
  async add_votes (req, res) {
    let data = req.body.data
    let { id } = JSON.parse(data)
    let sql = `update cat set votes=votes+1 where cat_id=${id};`
    try {
      console.log(await dao.sql(sql))
      res.send(JSON.stringify({
        state: 'ok'
      }))
    } catch (e) {
      console.log(e)
      res.send(JSON.stringify({
        state: 'err',
        msg: '操作失败，请检查cat_id的正确性'
      }))
    }
  },
  /**
   *获取指定数量的喵咪票数信息，用于投票页
   * */
  async get_cats_votes (req, res) {
    let data = req.body.data
    let { page, base } = JSON.parse(data)
    try {
      let result = await dao.sql(`select cat.name,cat.age,cat.votes,cat.type,CONCAT(images.realm_name,images.list,cat.head_img)as addr from cat inner join images where cat.images_id =images.images_id limit ${(page - 1) * 10},${base};`
      )
      res.send(JSON.stringify(result))

    } catch (e) {
      console.log(e)
      res.send(JSON.stringify({
        state: 'err'
      }))
    }
  }
}
module.exports = cat