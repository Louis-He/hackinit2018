//index.js
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    question: 'Initializing...',
    captureStatus: true,
  },

  skip: function () {
    this.getQuestion();
  },

  onLoad(){
    this.ctx = wx.createCameraContext()
    app.globalData.isReload = false
    var that = this
    wx.setStorage({
      key: 'isCorrect',
      data: true,
    })
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
    
  },

  onShow() {
    if (app.globalData.isReload) {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }    
    var that = this
    this.setData({
      captureStatus: true
    })
    wx.getStorage({
      key: 'isCorrect',
      success: function(res) {
        if (res.data){
          that.getQuestion();
        }else{
          console.log('不更换题目！')
        }
      },
    })
  },
  onHide(){
    console.log('老子走了')
    this.setData({
      captureStatus: true,
    })
  },

  takePhoto: function(){
    if (this.data.captureStatus) {
      console.log('WTF')
      this.ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          console.log('YES!')
          this.setData({
            src: res.tempImagePath,
            captureStatus: false
          })

          wx.setStorage({
            key: 'tempImagePath',
            data: res.tempImagePath,
          })
        },
        fail: (res) => {
          console.log('???')
        },
        error(e) {
          console.log('ERROR???')
          console.log(e.detail)
        }
      })
    } else {
      this.setData({
        captureStatus: true
      })
    }
    
  },
  uploadPhoto() {
    var that = this;
    console.log('UPLOADING!')
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: '../waiting/waiting',
    })
  },
  error(e) {
    console.log(e.detail)
  },
  getQuestion: function(){
    var that = this
    that.setData({
      question: "Loading..."
    })
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