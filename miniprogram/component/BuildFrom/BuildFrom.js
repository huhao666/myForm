// component/forms/forms.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: "input"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: "",
    options: [],
    option: "",
    imgUrl: ""
  },

  // 
  onShow() {
    this.setData({
      title: "",
      options: [],
      option: ""
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 上传图片
    uploadImg() {

      // 选择图片
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: res => {

          wx.showLoading({
            title: '上传中',
          })

          const filePath = res.tempFilePaths[0]
          console.log(filePath)

          // 上传图片
          const cloudPath = 'my-image' + Date.now() + filePath.match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success: res => {
              console.log('[上传文件] 成功：', res)
              console.log(res.fileID)
              this.setData({
                imgUrl: res.fileID
              })
            },
            fail: e => {
              console.error('[上传文件] 失败：', e)
              wx.showToast({
                icon: 'none',
                title: '上传失败',
              })
            },
            complete: () => {
              wx.hideLoading()
            }
          })

        },
        fail: e => {
          console.error(e)
        }
      })
    },

    // 生成表单的项
    inputOption() {
      let data = this.data
      let options = data.options.slice()
      if (!data.option.trim().length) {
        wx.showToast({
          title: "表单项不能为空",
          icon: "none"
        })
        return
      }
      options.push(data.option)
      this.setData({
        options,
        option: ""
      })
      console.log(this.data.options)
    },

    // 清空表单的项
    clearOption() {
      this.setData({
        option: ""
      })
    },

    // 删除某个列表项
    delOptionItem(e) {
      let index = e.currentTarget.dataset.idx
      let options = this.data.options.slice()
      options.splice(index, 1)
      this.setData({
        options
      })
    },

    // 选项输入
    handleOptionInput(e) {
      let option = e.detail.value
      this.setData({
        option
      })
    },

    // 标题输入
    handleTitleInput(e) {
      let title = e.detail.value
      this.setData({
        title
      })
    },

    // 点击确定按钮生成表单数据
    buildFormData() {
      const {
        type,
        title,
        options
      } = this.data
      if (!title.trim().length) {
        wx.showToast({
          title: "表单项标题不能为空",
          icon: "none"
        })
        return
      }

      if (options.length < 2 && type !== 'input') {
        wx.showToast({
          title: "表单项数量不少于2",
          icon: "none"
        })
        return
      }

      let newOptions = options.slice()
      let l = newOptions.length;
      for (let i = 0; i < l; i++) {
        let value = newOptions[i]
        newOptions[i] = {
          name: value,
          value,
          checked: false
        }
      }
      let cData = {
        type,
        title,
        options: newOptions,
        imgUrl: this.data.imgUrl
      }
      this.triggerEvent("buildFormData", cData)
    },

    // 关闭生成表单项
    closeBuildForm() {
      this.triggerEvent("closeBuildFormData");
    }
  }
})
