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
    message: ""
  }

  return new Promise((resolve, reject) => {
    db.collection('formData').where({
      fid: event.fid,
      userInfo: {
        openId: getOpenId
      }
    }).get().then((res) => {
      if (res.data.length) { //用户已填写
        resultMsg.success = false
        resultMsg.message = "已填写表单"
        resultMsg.templateDetail = res.data[0]
        resolve(resultMsg)
      } else {
        db.collection('formData').add({
          data: event
        }).then((res) => {
          resultMsg.success = true
          resultMsg.message = "成功"
          resultMsg.templateDetail = res.data
          resolve(resultMsg)
        })
      }
    }).catch((err) => {
      resultMsg.success = false
      resultMsg.message = "添加失败"
      return resultMsg
    })
  })
}
