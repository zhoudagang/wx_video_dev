

const app = getApp()

Page({
  data: {
    faceUrl:"../resource/images/noneface.png"
  },
  onLoad: function () {
    var me = this;
    var userinfo = app.globalData.userInfo;
    console.log(userinfo);
    me.setData({
      faceUrl :  userinfo.data.avatarurl
    })  
  },

  // 上传头像
  changeFace : function () {
    var me = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: [ 'compressed'],  // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'],  // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        var serverUrl = app.serverUrl;

        wx.showLoading({
          title: '等一会~',
        })

        wx.uploadFile({
          url: serverUrl +"/user/uploadFace?userid="+app.userinfo.id, 
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res);
            var data = JSON.parse(res.data);
            if (data.status == 200) {
              wx.hideLoading();
              wx.showToast({
                title: "上传成功",
                icon: "success"
              })
             var imageUrl = data.data;
              me.setData({
                faceUrl: serverUrl+imageUrl
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
  }

})
