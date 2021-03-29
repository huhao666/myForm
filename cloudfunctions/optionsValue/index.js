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
  }).get().then(res => {

    let title = res.data[0].list[event.index].title
    let type = res.data[0].list[event.index].type
    let options = res.data[0].list[event.index].options

    if (type == "radio") {
      for (let i = 0, len = options.length; i < len; i++) {
        arr.push({
          "name": options[i].value,
          "value": 0
        })
      }

      for (let i = 0, len = res.data.length; i < len; i++) {
        for (let j = 0, len = arr.length; j < len; j++) {
          if (res.data[i].list[event.index].optionsValue == arr[j].name) {
            arr[j].value += 1
          }
        }
      }
    } else if (type == "checkbox") {
      for (let i = 0, len = options.length; i < len; i++) {
        arr.push({
          "name": options[i].value,
          "value": 0
        })
      }

      for (let i = 0, len = res.data.length; i < len; i++) {
        for (let j = 0, len = arr.length; j < len; j++) {
          let checkboxArr = res.data[i].list[event.index].optionsValue.split(",")
          for (let k = 0, len = checkboxArr.length; k < len; k++) {

            if (arr[j].name == checkboxArr[k]) {
              arr[j].value += 1
            }

          }
        }
      }
    }

    // const set = {}
    // const result = []
    // const temp = res.data.partsList
    // for (let i = 0, l = temp.length; i < l; i++) {
    //   if (!set[temp[i].partNo]) {
    //     result.push(temp[i])
    //     set[temp[i].partNo] = true
    //   }
    // }

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