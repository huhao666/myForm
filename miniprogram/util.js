const app = getApp()
console.log(app)
const WCC = function (obj) {
    return wx.cloud.callFunction({
        name: obj.url,
        data: obj.data,
        config: {
            header: {
            Authorization: app.globalData.userId
            }
        }
    })
}
export { WCC };
