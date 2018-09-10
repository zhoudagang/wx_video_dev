//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    // 用于分页的属性
    totalPage: 1,
    page: 1,
    videoList: [],
    screenWidth: 350,
    serverUrl: ""
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
              
            }
          });
        } else {
          wx.redirectTo({
            url: '../login/login',
          })
        }
      }
// http://zhoudagang.tunnel.echomod.cn/180905FD7Y4GTX1P/video/5c3b5221-3944-4ea0-8b4a-95465c23f3e4.mp4
    });

    var me = this;
    var screenWidth = wx.getSystemInfoSync().screenWidth;
    me.setData({
      screenWidth: screenWidth,
    });
    // 获取当前的分页数
    var page = me.data.page;
    me.getAllVideoList(page);
  },


  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.getAllVideoList(1);
    console.log("下拉中。。")
  },

  onReachBottom: function () {
    console.log("上拉中。。")
    var me = this;
    var currentPage = me.data.page;
    var totalPage = me.data.totalPage;
    console.log(currentPage);
    console.log(totalPage);
    // 判断当前页数和总页数是否相等，如果想的则无需查询
    if (currentPage === totalPage) {
      wx.showToast({
        title: '已经没有视频啦~~',
        icon: "none"
      })
      return;
    }

    var page = currentPage + 1;

    me.getAllVideoList(page);
  },
  getAllVideoList: function (page) {
    var me = this;
    var serverUrl = app.serverUrl;
    wx.showLoading({
      title: '请等待，加载中...',
    });

    wx.request({
      url: serverUrl + '/video/showAll?page=' + page,
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();

        console.log(res);

        // 判断当前页page是否是第一页，如果是第一页，那么设置videoList为空
        if (page === 1) {
          me.setData({
            videoList: []
          });
        }

        var videoList = res.data.data.rows;
        var newVideoList = me.data.videoList;

        me.setData({
          videoList: newVideoList.concat(videoList),
          page: page,
          totalPage: res.data.data.total,
          serverUrl: serverUrl
        });
      }
    })
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