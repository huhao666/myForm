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
  let arr = []

  let result = db.collection('formData').where({
    fid: event.id
  }).skip(event.page * 10).limit(10).get().then(res => {

    let title = res.data[0].list[event.index].title

    for (let i = 0, len = res.data.length; i < len; i++) {
      arr.push(res.data[i].list[event.index].textValue)
    }

    resultMsg.success = true
    resultMsg.list = arr
    resultMsg.title = title
    return resultMsg

  }).catch((err) => {
    resultMsg.success = false
    resultMsg.message = err
    return resultMsg
  })

  return result
}
