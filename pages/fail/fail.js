// pages/fail/fail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  cancel: function() {
    wx.navigateBack({
      delta:1
    })
  },

  retry: function() {
    var that = this
    wx.getStorage({
      key: 'tempImagePath',
      success: function(res) {
        that.setData({
          tmpPath: res.data
        })
      },
    })
    wx.uploadFile({
      url: "https://hackinit.choosebridge.com/api/photo/upload", //仅为示例，非真实的接口地址
      filePath: that.tmpPath,
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
        wx.showModal({
          title: '提示',
          content: '这是一个模态弹窗',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      },
    })
  }

})