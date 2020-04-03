const dao = require('../dao')
const cat = {
  add_Votes (req, res) {
    let id = req.body.id
    console.log(id)
    dao.add_Votes(id,(err,result)=>{
      if(err){
        console.log('add_votes err')
      }else {
        res.send('ok')
      }
    })
  }
}
module.exports = cat