const app = getApp()

Page({
  data: {
    cover: "cover"
  },


  onLoad: function(params) {
    var me = this;

  },
  showSearch: function() {
    wx.navigateTo({
      url: '../searchVideo/searchVideo',
    })
  }
})