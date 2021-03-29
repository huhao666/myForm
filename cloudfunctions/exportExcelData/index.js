// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'myform-ea0hf'
})
const db = cloud.database()
//操作excel用的类库
const xlsx = require('node-xlsx');

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  try {
    
    //1,定义excel表格名
    let tableName = event.formDeta[0].title
    let dataCVS = "excel/"+ tableName + ".xlsx"
    // 表数据
    let excelData = event.formDeta
    console.log(excelData)
    // 先获取表头 tableHeader
    let alldata = []
    let row = ["工号","姓名","公司","部门"]
    for (let i = 0; i < excelData[0].list.length; i++) {
      row.push(excelData[0].list[i].title)
    }
    alldata.push(row)

    for (let i = 0; i < excelData.length; i++) {
      let tempArr = []
      for (let j = 0; j < excelData[i].list.length; j++) {
        tempArr.push(excelData[i].list[j].textValue || excelData[i].list[j].optionsValue)
      }
      alldata.push([
        excelData[i].pid,excelData[i].name,excelData[i].part,excelData[i].department, ...tempArr
      ])
    }

    //3，把数据保存到excel里
    var buffer = await xlsx.build([{
      name: "mySheetName",
      data: alldata
    }]);
    //4，把excel文件保存到云存储里
    var upload = await cloud.uploadFile({
      cloudPath: dataCVS,
      fileContent: buffer, //excel二进制文件
      success:res => {
        // get resource ID
        //console.log(res.fileID)
        return res
      },
      fail: err => {
        return err
      }
    })
    
    return await cloud.getTempFileURL({
      fileList: [upload.fileID],
      success: res => {
        console.log("文件下载链接", res.fileList[0].tempFileURL)
      }
    })
   

  } catch (e) {
    console.error(e)
    return e
  }
}