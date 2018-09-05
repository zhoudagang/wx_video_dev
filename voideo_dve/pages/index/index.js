//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  
  },
  onLoad : function () {
    var that = this;
     var userinfo = getApp().globalData.userInfo;
    console.log(userinfo);
  }
})
