// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'myform-ea0hf'
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  //获取当前用户的openid
  const getOpenId = cloud.getWXContext().OPENID

  let resultMsg = {
    success: false
  }

  return new Promise((resolve, reject) => {
    db.collection('form').where({
      state: event.state,
      openId: getOpenId
    }).get().then((res) => {
      resultMsg.total = res.data.length
      db.collection('form').where({
        openId: getOpenId,
        state: event.state
      }).skip(event.page * 10).limit(10).get().then(res => {
        resultMsg.success = true
        resultMsg.message = "成功"
        resultMsg.list = res.data
        resolve(resultMsg)
      }).catch((err) => {
        resultMsg.success = false
        resultMsg.message = "失败"
        resolve(resultMsg)
      })

    })
  })

}