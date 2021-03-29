//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  searchBox: function (e) {
    const that = this;
    let first, second;
    that.setData({
      account: e.detail.value.account,
      pwd: e.detail.value.pwd
    })
  },

  // button点击事件
  loginForm: function (data) {
    console.log(data)
    const requestData = data.detail.value;

    // 调用云函数
    wx.cloud.callFunction({
      name: 'mylogin',
      data: requestData,
      success: res => {
        if (res.result.success) {  
          app.globalData.userId = res.result.userId;  

          wx.switchTab({
            url: '/pages/template/template'
          })
        }else{
          wx.showToast({
            title: res.result.message,
            icon: 'error',
            duration: 2000
          })
        }
      },
      fail: err => {
        console.error('[云函数] [userlogin] 调用失败', err)
      }
    })
  }
})
