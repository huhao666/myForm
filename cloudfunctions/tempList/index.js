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
  let arr = []

  return new Promise((resolve, reject) => {
    db.collection('tempList').where({
        userId: event.userId
      }).get().then((res) => {
      resultMsg.total = res.data.length
      db.collection('tempList').where({
        userId: event.userId
      }).skip(event.page * 10).limit(10).get().then(res => {

        for (let i = 0, len = res.data.length; i < len; i++) {
          arr.push({
            id: res.data[i]._id,
            title: res.data[i].title
          })
        }
        resultMsg.success = true
        resultMsg.list = arr
        resultMsg.openId = getOpenId
        resolve(resultMsg)
      }).catch((err) => {
        resultMsg.success = false
        resultMsg.message = err
        resolve(resultMsg)
      })

    })
  })



}