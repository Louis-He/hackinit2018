// pages/waiting/waiting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isReturnResult: false,
    correctResult: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'tempImagePath',
      success: function (res) {
        that.setData({
          "tmpPath": res.data
        })

        wx.getStorage({
          key: 'openID',
          success: function (res) {
            that.setData({
              "openID": res.data
            })

            wx.getStorage({
              key: 'word',
              success: function (res) {
                console.log(res.data)
                that.setData({
                  "word": res.data
                })

                wx.uploadFile({
                  url: "https://hackinit.choosebridge.com/api/question/answer",
                  filePath: that.data.tmpPath,
                  name: 'picture',
                  header: {
                    'Content-Type': 'application/json',
                    "openID": that.data.openID,
                    "word": that.data.word
                  },
                  formData: {
                    'user': 'test'
                  },
                  success: function (res) {
                    that.setData({
                      isReturnResult: true
                    })
                    
                    res.data = JSON.parse(res.data)
                    console.log(res.data)
                    if(res.data.data.correct){
                      that.setData({
                        correctResult: true
                      })
                      wx.setStorage({
                        key: 'isCorrect',
                        data: false,
                      })
                    }else{
                      that.setData({
                        correctResult: true
                      })
                      wx.setStorage({
                        key: 'isCorrect',
                        data: true,
                      })
                    }
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

            })
          },
        })

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

  retakePhoto: function () {
    wx.navigateBack({
      delta: 1
    })
  }
})