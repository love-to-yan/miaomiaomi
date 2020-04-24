const dao = require('../dao')
const cat = {
  /*
  * 增加票数*/
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
  /**
   *获取指定数量的喵咪票数信息，用于投票页
   * */
  async get_cats_votes (req, res) {
    let data = req.body.data
    let { page, pageSize } = JSON.parse(data)
    try {
      let result = await dao.sql(`select cat.cat_id,cat.name,cat.age,cat.votes,cat.type,CONCAT(images.realm_name,images.list,cat.head_img)as head_img from cat inner join images where cat.images_id =images.images_id limit ${(page - 1) * 10},${pageSize};`
      )
      let result2 = await dao.sql('select count(*) as total from cat;')
      res.send(JSON.stringify({
        state:"ok",
        result:{
          total:result2.result[0].total,
          data:result.result
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
  /**
   * 获取喵咪详细信息
   * */
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
  /*
  * 获取喵咪照片
  * */
  async get_cat_photo(req,res){
    let data = JSON.parse(req.body.data)
    let id = data['cat_id']
    try{
      let result=await  dao.sql('select CONCAT(images.realm_name,images.list,cat_img.file_name)as addr '
      +'from images inner join cat_img where cat_img.images_id=images.images_id AND '
      +`cat_img.cat_id=${id} `)
      console.log(result)
      res.send(JSON.stringify(result))
    }catch (e) {
      console.log(e)
      res.send(JSON.stringify({
        state: 'err',
        result: {}
      }))
    }
  }
}
module.exports = cat