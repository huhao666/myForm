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

  let result = db.collection('tempList').doc(event.id).remove()
    .then(() => {
      resultMsg.success = true
      resultMsg.message = "删除成功"
      return resultMsg
    })
    .catch((err) => {
      resultMsg.success = false
      resultMsg.message = "删除失败"
      return resultMsg
    })

  return result
}
