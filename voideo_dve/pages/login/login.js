const app = getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              //从数据库获取用户信息
              that.queryUsreInfo();
              //用户已经授权过
              wx.redirectTo({
                url: '../index/index'
              })
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      wx.login({
        success: function(res) {
          var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
          wx.getUserInfo({
            success: function(res) {
              var iv = res.iv;
              var encryptedData = res.encryptedData;
              // 下面开始调用注册接口
              wx.request({
                url: getApp().serverUrl + '/user/register',
                data: {
                  code: code,
                  encryptedData: encryptedData,
                  iv: iv
                }, // 设置请求的 参数
                success: (res) => {
                  wx.setStorageSync("userInfo", res.data.data)
                  wx.redirectTo({
                    url: '../index/index',
                  })
                }
              })
            }
          })
        }
      })

    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function() {
    var openid =wx.getStorageSync("openid");
    wx.request({
      url: getApp().serverUrl + '/user/queryUserInfoByOpenId',
      data: {
        openid: openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        wx.setStorageSync("userInfo", res.data.data)
      }
    })
  },

})