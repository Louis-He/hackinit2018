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
    wx.showLoading({
      title: '加载中',
    })
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
                    wx.hideLoading()
                    that.setData({
                      isReturnResult: true
                    })

                    res.data = JSON.parse(res.data)
                    console.log('DEBUG:', res.data.data.correct)
                    console.log('DEBUG:', res.data.data)
                    if(res.data.data.correct){
                      that.setData({
                        correctResult: true,
                        description: res.data.data.description.text
                      })
                      wx.setStorage({
                        key: 'isCorrect',
                        data: true,
                      })
                      that.readEnglish(res.data.data.description.text);
                    }else{
                      that.setData({
                        correctResult: false
                      })
                      wx.setStorage({
                        key: 'isCorrect',
                        data: false,
                      })
                      that.readEnglish(res.data.data.answer);
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
  },

  nextPhoto: function (){
    wx.navigateBack({
      delta: 1
    })
  },

  readEnglish: function (input) {
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.title = '-'
    backgroundAudioManager.epname = '-'
    backgroundAudioManager.singer = '有道词典'
    var reg = new RegExp(' ', "g")
    var tmpURL = input.replace(reg, '%20');

    tmpURL = 'http://dict.youdao.com/dictvoice?audio=' + tmpURL

    backgroundAudioManager.src = tmpURL

    console.log('back:', tmpURL)
  }
})