//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;

    // 登录
    wx.login({
 
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;

        // 下面开始调用注册接口
     
        wx.request({
          url: that.serverUrl + '/user/login',
          data: { code: code }, // 设置请求的 参数
          success: (res) => {
            if (res.statusCode == 200) {
              try {
                wx.setStorageSync('openid', res.data.data)
              } catch (e) {
              }
            } else {
              wx.showToast({
                title: '网络错误',
                icon: none
              })
            }
          }
        })
      }
    })
  },
  serverUrl: "http://zhoudagang.tunnel.echomod.cn",
})