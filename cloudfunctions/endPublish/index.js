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
    return db.collection('form').doc(event.id).update({
      data: {
        state: 1
      }
    }).then(res => {
      console.log(res)
      resultMsg.success = true
      resultMsg.message = "成功结束发布"
      return resultMsg
    }).catch(err => {
      resultMsg.success = false
      resultMsg.message = err
      return resultMsg
    })
  }).catch(err => {
    resultMsg.success = false
    resultMsg.message = "不存在的模板id"
    return resultMsg
  })

  return result
}
