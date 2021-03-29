import {
  formDetail,
  optionsValue
} from "../../api"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    list: [],
    id: "",
    formDeta: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function ({
    id
  }) {
    let res = await formDetail({
      id
    })
    let {
      title,
      list,
      imgUrl
    } = res.result.templateDetail
    this.formDeta = res.result.templateDetail
    this.setData({
      id,
      title,
      list,
      formDeta: res.result.templateDetail
    })
    console.log(this.formDeta)
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
  onShareAppMessage: function () {
    return {
      title: this.data.title,
      path: "/pages/result/result?id=" + this.data.id
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  async gotoResult(e) {
    console.log(e)
    let temp = e.target.dataset
    let type = temp.type
    let index = temp.tid
    let imgUrl = temp.imgurl // 这里大写的都会被转成小写

    const app = getApp()

    let url = ""
    if (type === 'input') {
      url = '/pages/textList/textList'
    } else {
      url = '/pages/graph/graph'
      // 获取下个页面的数据
      let res = await optionsValue({
        id: this.data.id,
        index
      })
      let list = res.result.list
      let legend = []
      for (let i = 0, l = list.length; i < l; i++) {
        legend.push(list[i].name)
      }
      let title = res.result.title
      app.graph = {
        list,
        legend,
        title
      }
    }

    app.graph.imgUrl = imgUrl
    url = url + "?id=" + this.data.id + "&index=" + index + "&imgUrl=" + imgUrl

    wx.navigateTo({
      url
    })
  },
  // 
  back() {
    wx.navigateBack()
  }
})