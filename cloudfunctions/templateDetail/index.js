// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'myform-ea0hf'
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let resultMsg = {
    success: false
  }

  const result = await db.collection('tempList').doc(event.id).get().then(res => {
    resultMsg.success = true
    resultMsg.message = "成功"
    resultMsg.templateDetail = res.data
    return resultMsg
  }).catch(err => {
    resultMsg.success = false
    resultMsg.message = "失败"
    return resultMsg
  })

  return result
}
