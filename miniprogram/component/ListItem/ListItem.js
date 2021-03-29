import {
  deleteTemplate,
  publish,
  deleteForm,
  endPublish,
  formsDetail,
  exportExcelData
} from "../../api"

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "123"
    },
    state: {
      type: String,
      value: ""
    },
    mode: {
      type: Number,
      value: 0
    },
    tid: {
      type: String
    },
    idx: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    dialogShow: false,
    showOneButtonDialog: false,
    oneButton: [{
      text: '确定'
    }],

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 编辑
    edit(e) {
      wx.navigateTo({
        url: "/pages/create/create?id=" + this.data.tid
      })
    },

    // 发布
    async publishForm() {
      wx.showModal({
        title: "发布表单",
        content: "是否发布 “" + this.data.title + "” 表单模板？",
        showCancel: true,
        success: async ({
          confirm
        }) => {
          if (confirm) {
            let res = await publish({
              id: this.data.tid
            })
            if (res.result.success) {
              wx.showToast({
                title: "模板发布成功",
                icon: "success",
                duration: 2000,
                success() {
                  wx.switchTab({
                    url: "/pages/list/list"
                  })
                }
              })
            } else {
              wx.showToast({
                title: res.resultmessage,
                icon: "none"
              })
            }
          }
        }
      })
    },

    // 删除表单模板
    deleteTpl() {
      wx.showModal({
        title: "删除表单",
        content: "是否删除 “" + this.data.title + "” 表单模板？",
        showCancel: true,
        success: async ({
          confirm
        }) => {
          if (confirm) {
            let res = await deleteTemplate({
              id: this.data.tid
            })
            if (res.result.success) {
              this.triggerEvent("delete", {
                idx: this.data.idx
              })
            } else {
              wx.showToast({
                title: res.resultmessage,
                icon: "none"
              })
            }
          }
        }
      })
    },

    // 分享进行中的表单
    handlePreview() {
      wx.navigateTo({
        url: "/pages/preview/preview?id=" + this.data.tid
      })
    },

    // 删除表单
    delFrom() {
      wx.showModal({
        title: "删除表单",
        content: "是否删除 “" + this.data.title + "” 表单？",
        showCancel: true,
        success: async ({
          confirm
        }) => {
          if (confirm) {
            let res = await deleteForm({
              id: this.data.tid
            })
            if (res.result.success) {
              this.triggerEvent("delete", {
                idx: this.data.idx
              })
            } else {
              wx.showToast({
                title: res.resultmessage,
                icon: "none"
              })
            }
          }
        }
      })
    },

    // 结束已发布的表单
    closeFrom() {
      wx.showModal({
        title: "结束发布",
        content: "是否结束 “" + this.data.title + "” 表单？",
        showCancel: true,
        success: async ({
          confirm
        }) => {
          if (confirm) {
            let res = await endPublish({
              id: this.data.tid
            })
            if (res.result.success) {
              this.triggerEvent("delete", {
                idx: this.data.idx
              })
              wx.showToast({
                title: '已结束发布',
                icon: 'success'
              })
            } else {
              console.log(res.result.message)
            }
          }
        }
      })
    },

    // 查看结果
    handleResult() {
      wx.navigateTo({
        url: "/pages/result/result?id=" + this.data.tid
      })
    },

    //导出表单
    exportExcel() {
      wx.showModal({
        title: "导出表单",
        content: "是否导出 “" + this.data.title + "” 表单？，导出成功后请在浏览器中打开生成链接",
        showCancel: true,
        success: async ({
          confirm
        }) => {
          if (confirm) {
            let res = await formsDetail({
              id: this.data.tid
            })
            console.log("导出数据：");
            console.log(this.data.tid)
            console.log(res)
            
            if (res.result.success) {
              let getDetails = res.result.detailList

              let res2 = await exportExcelData({
                formDeta: getDetails
              })
              console.log("导出：");
              console.log(res2.result)
              if (res2.result.fileList[0].status==0) {
                let result = res2.result.fileList[0].tempFileURL
                wx.setClipboardData({
                  data: result,
                  success(res2) {
                    wx.getClipboardData({
                      success(res2) {
                        wx.showToast({
                          title: '已复制到粘贴板',
                          icon: 'success',
                          duration: 2000
                        })
                      }
                    })
                  }
                })
              }else{
                if(res.result.detailList.length<1){
                  wx.showToast({
                    title: '无数据可导出',
                    icon: 'error'
                  })
                }else{
                  wx.showToast({
                    title: '导出失败',
                    icon: 'error'
                  })
                }
              }
              
            }  
          }
        }
      })
    }
  }
})