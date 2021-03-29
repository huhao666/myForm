// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'myform-ea0hf'
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const getOpenId = cloud.getWXContext().OPENID
  let resultMsg = {
    success: false,
    message: "",
    data:""
  }
  let result

  result = db.collection('users').where({
    openId: getOpenId
  }).get().then(res => {
    if(res.data.length>0){
      resultMsg.success = true
      resultMsg.message = "已绑定微信"
      resultMsg.data = res.data
      return resultMsg
    }else{
      resultMsg.success = false
      resultMsg.message = "该用户未绑定"
      return resultMsg
    }
  }).catch(err => {
    resultMsg.success = false
    resultMsg.message = "请求失败"
    return resultMsg
  })
  return result
}
