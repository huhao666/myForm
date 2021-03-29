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

  return new Promise((resolve, reject) => {
    db.collection('formData').where({
      fid: event.id
    }).get().then((res) => {
      if (res.data.length) {
        resultMsg.success = true
        resultMsg.message = "成功"
        resultMsg.detailList = res.data
        resolve(resultMsg)
      } else {
        resultMsg.success = false
        resultMsg.message = "失败"
        resultMsg.detailList = res.data
        resolve(resultMsg)
      }
    })
  })


}