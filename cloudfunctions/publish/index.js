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
    success: false,
    message: ""
  }
  let result

  result = db.collection('tempList').doc(event.id).get().then(res => {
    let needRes = {}
    needRes.state = 0
    needRes.title = res.data.title
    needRes.list = res.data.list
    needRes.tid = res.data._id
    needRes.openId = getOpenId

    return db.collection('form').add({
      data: needRes
    }).then(res => {
      resultMsg.success = true
      resultMsg.message = "添加成功"
      return resultMsg
    }).catch(err => {
      resultMsg.success = false
      resultMsg.message = "添加失败"
      return resultMsg
    })

  }).catch(err => {
    resultMsg.success = false
    resultMsg.message = "不存在的模板id"
    return resultMsg
  })

  return result
}
