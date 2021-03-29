// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'myform-ea0hf'
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  const result = await db.collection('account').where({
    account: event.account
  }).get()

  let resultMsg = {
    success: false,
    message: ""
  }



  if (result.data[0]) {
    resultMsg.success = false
    resultMsg.message = "密码错误"
    for (let i = 0, len = result.data.length; i < len; i++) {
      if (result.data[i].password == event.password) {
        resultMsg.success = true
        resultMsg.message = "密码正确"
        resultMsg.userId = result.data[i]._id
        break
      }
    }
  } else {
    resultMsg.success = false
    resultMsg.message = "账号不存在"
  }
  return resultMsg
}
