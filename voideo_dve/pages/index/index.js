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
  onLoad: function(options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              //从数据库获取用户信息
              that.queryUsreInfo();
              that.setData({
                userInfo: res.userInfo
              })
              wx.navigateTo({
                url: '../mine/mine',
              })
            }
          });
        } else {
          wx.redirectTo({
            url: '../login/login',
          })
        }
      }

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //获取用户信息接口
  queryUsreInfo: function() {
    var opneid = wx.getStorageSync("openid");
    wx.request({
      url: getApp().serverUrl + '/user/queryUserInfoByOpenId',
      data: {
        openid: opneid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        wx.setStorageSync("userInfo", res.data.data);

      }
    })
  },
})