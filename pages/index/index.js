//index.js
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    question: 'Initializing...'
  },

  onLoad() {
    this.getQuestion();
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://hackinit.choosebridge.com/api/openid',
            data: {
              code: res.code
            },
            method: 'POST',
            success: function (res) {
              that.setData({
                openID: res.data.openid
              })
              wx.setStorage({
                key: 'openID',
                data: res.data.openid,
              })
            },
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
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
    console.log('UPLOADING!')
    wx.navigateTo({
      url: '../waiting/waiting',
    })
  },
  error(e) {
    console.log(e.detail)
  },
  getQuestion: function(){
    var that = this
    wx.request({
      url: 'https://hackinit.choosebridge.com/api/question/new',
      header:{
        'openid': that.data.openID
      },
      method: 'POST',
      success: function(res){
        console.log(res.data)
        that.setData({
          "question": res.data.word
        })
        wx.setStorage({
          key: 'word',
          data: res.data.word,
        })
      }
    })
  }
})