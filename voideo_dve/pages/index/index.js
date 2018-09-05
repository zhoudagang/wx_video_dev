//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.navigateTo({
        url: "/pages/login/login"
      })
    } else {
      that.setData({
        userInfo: userInfo
      })
    }
  }


 
})