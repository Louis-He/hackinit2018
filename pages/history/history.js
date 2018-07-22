// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottomCount: 2,
    loadmorehidden: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().globalData.isReload = true;

    var that = this
    that.setData({
      loadmorehidden: false,
    })

    wx.getStorage({
      key: 'openID',
      success: function(res) {
        that.setData({
          openID: res.data
        })
        that.getHistory(0,10)
      },
    })
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
   this.getHistory(0, 10)
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
    var that = this;
    var tmpBottomCount = that.data.bottomCount + 1

    that.getHistory(0, that.data.bottomCount * 10)

    that.setData({
      bottomCount: tmpBottomCount
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  getHistory: function(offset, limit) {
    var that = this
    wx.request({
      url: 'https://hackinit.choosebridge.com/api/question/history',
      header: {
        'openid': that.data.openID
      },
      data: {
        'offset': offset,
        'limit': limit
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        that.setData({
          list: res.data.data
        })

        if (res.data.is_end){
          that.setData({
            loadmorehidden: true
          })
        }else{
          that.setData({
            loadmorehidden: false
          })
        }

      },
    })
    
  },
  
  /*
  getPicture: function(URL){
    var that = this
    wx.request({
      url: 'https://hackinit.choosebridge.com/api/picture/get',
      data: {
        'picture_id': URL,
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
      },
    })
  }
  */
})