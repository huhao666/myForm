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

  const result = db.collection('users').doc(event.id).update({
    data: {
      openId: getOpenId
    }
  }).then(res => { 
    resultMsg.success = true
    resultMsg.message = "添加成功"
    return resultMsg
  }).catch(err => {
    resultMsg.success = false
    resultMsg.message = "请求失败"
    return resultMsg
  })
  return result

}
