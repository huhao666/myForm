// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'myform-ea0hf'
})
const db = cloud.database()


// 云函数入口函数

exports.main = async (event, context) => {

  let resultMsg = {
    success: false,
    message: ""
  }
  let result

  result = db.collection('form').doc(event.id).get().then(res => {
    
      console.log(res)
      resultMsg.success = true
      resultMsg.message = "请求成功"
      resultMsg.state = res.data.state
      return resultMsg
  
  }).catch(err => {
    resultMsg.success = false
    resultMsg.message = "请求失败"
    return resultMsg
  })
  return result
}
