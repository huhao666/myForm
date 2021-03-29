import {
  textValue
} from "../../api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    list: [],
    page: 0,
    done: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function ({
    id,
    index,
    imgUrl
  }) {
    const app = getApp()
    console.log(app)
    this.setData({
      id,
      index,
      imgUrl: app.graph.imgUrl
    })
    // 首次获取数据
    this.getTextValue()
  },

  // 获取文本列表的内容
  async getTextValue() {
    let {
      id,
      index,
      page
    } = this.data
    let res = await textValue({
      id,
      index,
      page
    })
    if (res.result.success) {
      let {
        list,
        title
      } = res.result
      list = list.concat(this.data.list)
      let done = false
      if (list.length < 10) {
        done = true
      }
      this.setData({
        title,
        list,
        done
      })
    }
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
      done: false,
      list: []
    })
    this.getTextValue()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.done) {
      return
    }
    this.setData({
      page: this.data.page + 1
    })
    this.getTextValue()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})