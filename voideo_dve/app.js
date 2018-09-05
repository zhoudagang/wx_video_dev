//app.js
App({
  onLaunch: function () {

    var that = this;
    // 登录
    wx.login({
      
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        console.log(res)
        wx.request({
          url: that.globalData.wx_url_1 + res.code + that.globalData.wx_url_2,
          success: res => {
            that.globalData.openid = res.data.openid;
            console.log(res)
          }
        })
      }
    })

  },
  // AppID(小程序ID)	AppSecret(小程序密钥)	 建议不要以明文存储，推荐放在DB
  globalData: {
    openid: 0,
    wx_url_1: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxd994f9ee4728adc2&secret=9b07175849b1a8689556e1d2b5f8e94b&js_code=',
    wx_url_2: '&grant_type=authorization_code',
    userInfo : ""
  },

  serverUrl :"http://zhougang.tunnel.echomod.cn"







})