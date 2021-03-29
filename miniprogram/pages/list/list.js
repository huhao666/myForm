import { getFormList } from "../../api"
import { wAjax } from "../../util"

Page({
  data: {
    tabs: [],
    list: [],
    activeTab: 0,
    page: 0,
    notEnd: true
  },

  onLoad() {
    // 设置页面标题
    const titles = ['进行中', '已结束']
    const tabs = titles.map(item => ({ title: item }))
    this.setData({ tabs })
  },

  onShow() {
    this.setData({
      list: [],
      page: 0,
      notEnd: true
    })
    this.formList()
  },

  onPullDownRefresh: function () {
      this.setData({
        page: 0,
        list: [],
        notEnd: true
      })
      this.formList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.notEnd) {
      this.setData({
        page: this.data.page + 1
      })
      this.formList()
    }
  },

  // 获取表单列表
  async formList() {
    if(!this.data.notEnd) {
      return 
    }

    let res = await getFormList({ state:  this.data.activeTab, page: this.data.page})
    console.log(res)
    let notEnd = true
    if(res.result.list.length < 10) {
      notEnd = false
    }
    let list = this.data.list.slice()
    list = list.concat(res.result.list)
    this.setData({
      list,
      notEnd
    })
  },

  // 点击 tabs 切换获取数据
  onTabCLick(e) {
    const index = e.detail.index
    let tabs = this.data.tabs
    this.setData({
      notEnd: true,
      list: [],
      activeTab: index,
      page: 0
    })
    this.formList()
  },

  // tab 切换
  onChange(e) {
    this.setData({
      activeTab: e.detail.index
    })
  },

  // 删除表单项
  deleteFrom(e) {
    console.log(e)
    let idx = e.detail.idx
    console.log(e)
    let list = this.data.list.slice()
    list.splice(idx, 1)
    this.setData({
      list
    })
  }
})
