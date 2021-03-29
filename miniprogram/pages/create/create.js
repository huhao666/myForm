// miniprogram/pages/create/create.js
import debounce from '../../utils/debounce.js';
import { saveForm, templateDetail} from "../../api"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showActionsheet: false,
    showBuildForm: false,
    groups: [
      {
        text: "输入型",
        value: "input"
      },
      {
        text: "单选型",
        value: "radio"
      },
      {
        text: "多选型",
        value: "checkbox"
      }
    ],
    type: "input",
    formItemList: [],
    title: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function ({id}) {
    // 存在 id，表示是编辑，不存在是创建
    if(id) {
      // 通过 id 获取表单信息
      let res = await templateDetail({id}) 
      if(res.result.success) {
        let {_id, title, list} = res.result.templateDetail
        console.log(id)
        console.log(title)
        console.log(list)
        this.setData({
          id: _id,
          title,
          formItemList: list
        })
      }
    }
  },

  handleTitleInput(e) {
    this.setData({
      title: e.detail.value
    })
  },

  // 打开 actionsheet
  openActionsheet() {
    this.setData({
      showActionsheet: true
    })
  },

  // 关闭 actionsheet
  closeActionsheet() {
    this.setData({
      showActionsheet: false
    })
  },

  // 选择表单项的类型
  clickActionsheet(e) {
    let value = e.detail.value
    this.setData({
      type: value,
      showBuildForm: true
    })
    this.closeActionsheet()
  },
  
  // 获取 buildFrom 的数据
  getFormData(data) {
    data = data.detail
    let formItemList = this.data.formItemList.slice()
    formItemList.push(data)
    this.setData({formItemList,
      showBuildForm: false
    })
  },

  // 关闭构建表单的组件
  closeBuildFormData() {
    this.setData({
      showBuildForm: false
    })
  },

  // 删除已经添加好的表单项
  delFromItem(e) {
    let index = e.currentTarget.dataset.idx;
    let formItemList = this.data.formItemList.slice();
    formItemList.splice(index, 1);
    this.setData({
      formItemList
    })
  },

  // 保存生成好的表单
  saveForms:debounce(async function(){
    if(!this.data.title.trim().length) {
      wx.showToast({
        title: "标题不能为空",
        icon: "none"
      })
      return
    } 

    if(!this.data.formItemList.length) {
      wx.showToast({
        title: "请添加表单项",
        icon: "none"
      })
      return
    }

    let res = await saveForm({
      id: this.data.id,
      title: this.data.title,
      list: this.data.formItemList,
      userId:getApp().globalData.userId
    });

    if(res.result.success) {
      wx.showToast({
        title: "表单提交成功",
        icon: "success",
        duration: 2000,
        success() {
          wx.switchTab({
            url: "/pages/template/template"
          })
        }
      })
    }
  },1000,{
    leading:true,
    trailing:false
  }),

 
})