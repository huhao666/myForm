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
  let result;
  if (event.id) {
    result = db.collection('tempList').doc(event.id).update({
      data: {
        list: event.list,
        title: event.title,
        userId:event.userId
      }
    }).then(res => {
      console.log(res)
      resultMsg.success = true
      resultMsg.message = "修改成功"
      return resultMsg
    }).catch(err => {
      resultMsg.success = false
      resultMsg.message = err
      return resultMsg
    })
  } else {
    result = db.collection('tempList').add({
      data: event
    }).then(res => {
      resultMsg.success = true
      resultMsg.message = "添加成功"
      return resultMsg
    }).catch((err) => {
      resultMsg.success = false
      resultMsg.message = "添加失败"
      return resultMsg
    })
  }

  return result
}
