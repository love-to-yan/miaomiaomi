let data={
  a:1,
  c:3,
  method:'dbt'
}
let value={
  dat(){
    console.log('this is dat')
  },
  dct(){
    console.log('this is dct')
  }
}
if(data.a !== undefined){
  console.log('data.a is ',data.a)
}
try{
  if( value[data.method] !== undefined){
    console.log('有这么个属性')

  }else {
    console.log('弄')
  }

}catch (e) {
  let data = {
    err:'err',
    msg:e
  }
console.log(data
)
}
