const app = getApp()

Page({
  data: {
    bgmList: {},
    serverUrl: "",
    poster: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKrRoI4mO0SnLUS5wqrpCNYsUxIrlXY2uzB8xYsLUjhLK3Xt37H7eNPyWlm5TGlcmBahNU5wM3riag/132',
    videoParams: {}

  },
  onReady: function(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  onLoad: function(res) {
    var me = this;
    me.setData({
      videoParams: res
    })
    console.log(res);

    wx.showLoading({
      title: '努力加载中~',
    })
    var serverUrl = app.serverUrl;
    wx.request({
      url: serverUrl + '/bgm/qureryBgmList',
      success: (res) => {
        if (res.data.status == 200) {
          wx.hideLoading();
          var list = res.data.data;
          me.setData({
            bgmList: list,
            serverUrl: serverUrl
          })
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '网络异常~',
            icon: "none"
          })
        }
      }
    })
  },
  upload: function(res) {
    var me = this;
    var bgmId = res.detail.value.bgmId;
    var desc = res.detail.value.desc;

    var duration = me.data.videoParams.duration; //秒
    var temHeight = me.data.videoParams.tmpHeight;
    var temWidth = me.data.videoParams.tmpWidth;
    var tempVideoUrl = me.data.videoParams.tempVideoUrl;
    var tempCoverUrl = me.data.videoParams.tempCoverUrl;
    console.log(tempVideoUrl)

    //开始上传
    wx.showLoading({
      title: '等一会~',
    })
    var serverUrl = app.serverUrl;
    var user = wx.getStorageSync("userInfo");
    console.log(user)
    wx.uploadFile({
      url: serverUrl + "/video/upload" ,
      filePath: tempVideoUrl,
      formData: {
        userId:user.id,
        bgmId: bgmId,
        videoSeconds: duration,
        videoWidth: temWidth,
        videoHeight: temHeight,
        desc: desc
      },
      name: 'file',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
       // var data = JSON.parse(res.data);
        if (res.data.status == 200) {
          wx.hideLoading();
          wx.showToast({
            title: "上传成功",
            icon: "success"
          })
   
        } else {
          wx.hideLoading();
          wx.showToast({
            title: "上传失败",
            icon: "none"
          })
        }

      }
    })

  }



})