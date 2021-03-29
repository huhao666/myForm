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
    name: event.name,
    pid: event.pid
  }).get().then(res => {
    if(res.data.length>0){
      if(res.data.openId){
        resultMsg.success = false
        resultMsg.message = "该工号已绑定微信，请联系管理员修改"
        return resultMsg
      }else{
        resultMsg.success = true
        resultMsg.message = "成功"
        resultMsg.data = res.data
        return resultMsg
      }
    }else{
      resultMsg.success = false
      resultMsg.message = "用户信息有误，请重试"
      return resultMsg
    }
  }).catch(err => {
    resultMsg.success = false
    resultMsg.message = "请求失败"
    return resultMsg
  })
  return result

}
