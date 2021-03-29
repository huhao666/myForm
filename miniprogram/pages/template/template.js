import { getTemplate } from "../../api"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    templateList: [],
    page: 0,
    notEnd: true,
    userId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户id
    console.log(getApp().globalData.userId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      templateList: [],
      page: 0,
      notEnd: true
    })
    this.getTemplateList({ page: this.data.page })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      page: 0,
      templateList: [],
      notEnd: true
    })
    this.getTemplateList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.notEnd) {
      this.setData({
        page: this.data.page + 1
      })
      this.getTemplateList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 进入新增页面
  addForm() {
    wx.navigateTo({
      url: "/pages/create/create"
    })
  },

  // 初始化获取表单模板列表
  async getTemplateList() {
    let res = await getTemplate({ page: this.data.page,userId:getApp().globalData.userId })
    if (res.result.success) {
      let list = res.result.list
      let notEnd = true
      if(list.length < 10) {
        notEnd = false
      }
      let templateList = this.data.templateList.slice()
      templateList = templateList.concat(res.result.list)
      this.setData({ templateList, notEnd })
    }
  },

  // 删除表单
  deleteTemplate(e) {
  console.log(e)
    let idx = e.detail.idx
    console.log(idx)
    let templateList = this.data.templateList.slice()
    templateList.splice(idx, 1)
    this.setData({
    templateList
  })
}
})