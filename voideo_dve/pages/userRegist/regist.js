const app = getApp()

Page({
    data: {

    
    },
    doRegist: function (e) {  //用户注册
      var userObject = e.detail.value;
      var username = userObject.username;
      var password = userObject.password;
      if (username.length == 0 || password.length == 0) {
        wx.showToast({
          title: '用户名或密码不能为空哦！',
          icon:"none",
          duration:3000
        })

      } else {
        wx.request({
          url: app.serverUrl +"/regist",
          method:"POST",
          data: {
            username: username,
            password: password
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data);
            var status =res.data.status;
            if (status == 200) {
              wx.showToast({
                title: '注册成功',
                icon: "none",
                duration: 3000
              })
            } else if (status == 500) {
              wx.showToast({
                title: res.data.msg,
                icon: "none",
                duration: 3000
              })
            }
          }
        })
      }
  },
  goLoginPage: function (e) { //用户登陆
  console.log(e);
    var userObject = e.detail.value;
    var username = userObject.username;
    var password = userObject.password;
    if (username.length == 0 || password.length == 0) {
      wx.showToast({
        title: '用户名或密码不能为空哦！',
        icon: "none",
        duration: 3000
      })

    } else {
      wx.showLoading({
        title: '等一会~',
      })
      wx.request({
        url: app.serverUrl + "/login",
        method: "POST",
        data: {
          username: username,
          password: password
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data);
          var status = res.data.status;
          if (status == 200) {
            wx.hideLoading();
            wx.showToast({
              title: '登陆成功',
              icon: "none",
              duration: 3000
            }),

            app.userinfo = res.data.data;
            
            wx.navigateTo({
              url: '../mine/mine',
            })

          } else if (status == 500) {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 3000
            })
          }
        }
      })
    }
  }



})