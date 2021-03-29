// component/FormRender/FormRender.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ""
    },
    type: {
      type: String,
      value: ""
    },
    options: {
      type: Array
    },
    index: {
      type: Number,
      value: 0
    },
    textValue: String,
    optionsValue: String || Array,
    canEdit: Boolean,
    imgUrl: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    textValue: "",
    optionsValue: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 单选的结果
    radioChange: function (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value);
      this.setData({
        optionsValue: e.detail.value
      });
      this.reportData()
    },

    // 多选的结果
    checkboxChange: function (e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value);
      this.setData({
        optionsValue: e.detail.value
      })
      this.reportData()
    },

    // 输入型的结果
    textChange: function (e) {
      console.log(e)
      let value = e.detail.value
      this.setData({
        textValue: value,
      })
      this.reportData()
    },

    // 上报数据（用于用户数据的更新）
    reportData() {
      console.log("*********report: ")
      let data = {
        textValue: this.data.textValue,
        optionsValue: this.data.optionsValue,
        idx: this.data.index
      }
      this.triggerEvent("formItemDataChange", data)
      console.log("上报数据")
    }
  }
})