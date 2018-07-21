//index.js
//获取应用实例
const app = getApp()
Page({
  onLoad() {
    this.ctx = wx.createCameraContext()
  },
  takePhoto() {
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })

        wx.setStorage({
          key: 'tempImagePath',
          data: res.tempImagePath,
        })
      }
    })
  },
  uploadPhoto() {
    var that = this;
    wx.uploadFile({
      url: "https://hackinit.choosebridge.com/photo/upload", //仅为示例，非真实的接口地址
      filePath: that.videoSrc,
      name: 'testPhoto',
      formData: {
        'user': 'test'
      },
      success: function (res) {
        console.log('success')
        //do something
        wx.navigateTo({
          url: '../waiting/waiting',
        })
      },
      fail: function (res) {
        console.log('fail')
        //do something
        wx.navigateTo({
          url: '../fail/fail',
        })
      },
    })
  },
  error(e) {
    console.log(e.detail)
  }
})