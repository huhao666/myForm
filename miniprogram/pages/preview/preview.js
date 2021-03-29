import {
  formDetail,
  submit,
  permission,
  getPermission,
  toPermission,
  formisEnd
} from "../../api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    list: [],
    canEdit: true,
    id: '',
    mobile: '', //云函数返电话号码
    masking: true, // 旧版蒙版


    dialogShow: true, // 新版蒙版
    closableShow: false, // 点击蒙层是否可以关闭 默认false
    userName: "", //姓名
    jobNumber: "", //工号
    userData: {} //员工信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: async function(){
    //判断用户是否绑定微信
    let userStatus = await getPermission()
    console.log(userStatus)
    if(userStatus.result.success){
      this.setData({
        dialogShow: false,
        userData: userStatus.result.data[0]
      })
    }
  },
  onLoad: async function ({
    id
  }) {
    if (id) {
      let res = await formDetail({
        id
      })
      console.log(id)
      console.log(res)
      if (!res.result.success) {
        this.setData({
          canEdit: false
        })
      }
      let {
        title,
        list
      } = res.result.templateDetail
      this.setData({
        title,
        list,
        id
      })
      
    }
  },

  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  jobNumberInput: function (e) {
    this.setData({
      jobNumber: e.detail.value
    })
  },
  // 点击确认按钮
  async getInfo(e) {
    let res = await permission({
      name: this.data.userName,
      pid: this.data.jobNumber,
    })
    console.log(res)
    if (res.result.success) {
      let userData = res.result.data[0]
      let getId = userData._id
      let res2 = await toPermission({
        id: getId
      })
      console.log(res2)
      if(res2.result.success){
        this.setData({
          dialogShow: false,
          showOneButtonDialog: false,
          userData: userData
        })
      }
    } else {
      wx.showToast({
        title: res.result.message,
        duration: 2000,
      })
    }
  },

  // 点击重置按钮
  cancel() {
    this.setData({
      inputValue: ''
    })
  },
  //button 点击事件
  getPhoneNumber(e) {
    console.log(e)
    var that = this;
    wx.cloud.callFunction({
      name: 'getPhoneNumber',
      data: {
        weRunData: wx.cloud.CloudID(e.detail.cloudID),
      }
    }).then(res => {
      that.setData({
        mobile: res.result,
        masking: false
      })
      wx.showToast({
        title: "获取手机号成功！",
        icon: "success"
      })
    }).catch(err => {
      wx.showToast({
        title: "获取手机号失败！",
        icon: "none"
      })
    });
  },

  onShareAppMessage: function () {
    return {
      title: this.data.title,
      path: "/pages/preview/preview?id=" + this.data.id
    }
  },

  // 获取从组件传过来的数据
  handleData(e) {
    let data = e.detail;
    console.log(data)
    let list = this.data.list
    let l = list.length
    for (let i = 0; i < l; i++) {
      if (data.idx === i) {
        list[i].textValue = data.textValue
        list[i].optionsValue = data.optionsValue
      }
    }
  },

  //提交表单
  submitForm() {
    let {
      id,
      list,
      title,
      mobile
    } = this.data
    let flag = true
    for (let i = 0; i < list.length; i++) {
      if (!list[i].textValue && !list[i].optionsValue) {
        flag = false
      }
    }
    if (!flag) {
      wx.showToast({
        title: "还有表单未填",
        icon: "none"
      })
      return
    }
    wx.showModal({
      title: "提交",
      content: "是否提交 “" + this.data.title + "” 表单？",
      showCancel: true,
      success: async ({
        confirm
      }) => {
        if (confirm) {
          
          let res2 = await formisEnd({
            id: id
          })
          if(res2.result.state>0){
            wx.showToast({
              title: "表单已结束",
              icon: "error"
            })
          }else{
            let res = await submit({
              fid: id,
              list,
              title,
              department: this.data.userData.department,
              name: this.data.userData.name,
              part: this.data.userData.part,
              pid: this.data.userData.pid,
            })
            if (res.result.success) {
              wx.showToast({
                title: "提交成功！",
                icon: "success"
              })
            } else {
              wx.showToast({
                title: res.result.message + "",
                icon: "none"
              })
            }


          }
        }
      }
    })
  }
})