// pages/mine/feedback/feedback.js
var app = getApp()
Page({
  data: {
    feedback: '',
    contact: '',
    usersInfo: {},
  },

  feedback: function (e) {
    this.setData({
      feedback: e.data.value
    })
    // console.log('执行了吗' + feedback)
  },

  contant: function (e) {
    this.setData({
      contant: e.detail.value
    })
  },

  formSubmit: function (e) {
    var feedback = e.detail.value.feedback
    var contact = e.detail.value.contact
    //判断反馈信息是否为空
    if (feedback) {
      wx.cloud.init()
      var that = this;
      const db = wx.cloud.database({
        // env: 'blank-formal'
      })
      var users = wx.getStorageSync('users')
      var usersInfo = app.globalData.userInfo
      console.log(usersInfo.nickName)
      console.log('contant:' + contact)
      console.log('feedback:' + feedback)
      db.collection('Feedback').add({
        data: {
          nickName: usersInfo.nickName,
          feedback: feedback,
          contact: contact
        },
        success: onLaunch => {
          // 在返回结果中会包含新创建的记录的 _id
          wx.navigateBack({
            delta: 1
          })
          wx.showToast({
            title: '提交成功',
          })
          console.log('提交成功，记录 _id: ', formSubmit._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '提交失败'
          })
          console.error('提交失败：', err)
        },
      })
      
    }
    else {
      wx.showToast({
        icon: 'none',
        title: '反馈信息不能为空'
      })
    }
  }
})