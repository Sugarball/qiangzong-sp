//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    areaIndex: 0,
    area: ['贷款', '存款', '办卡'],
    areaIndex1: 0,
    area1: ['开化', '衢州', '江山'],
  },
  bindPickerChange: function (e) {
    this.setData({
      areaIndex: e.detail.value
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  formBindsubmit: function (e) {
    console.log('formBindsubmit')
    if (e.detail.value.name.length == 0 || e.detail.value.tel.length == 0) {
      this.setData({
        tip: '提示：姓名和手机号码不能为空！',
        name: '',
        tel: ''
      })
    } else {
      var that = this
      that.setData({
        tip: '提交成功！',
        name: e.detail.value.name,
        tel: e.detail.value.tel
      })
      var wilddog = require('wilddog-weapp-all')
      var config = {
        syncURL: 'https://wd2314045701ifftmw.wilddogio.com',
        authDomain: 'wd2314045701ifftmw.wilddog.com'
      }
      wilddog.initializeApp(config)

      var ref = wilddog.sync().ref("/");
      console.log({
        "name": e.detail.value.name,
        "tel": e.detail.value.tel,
        "rengonghao": e.detail.value.adr,
        "banli": this.data.area[this.data.areaIndex],
        "dizhi": this.data.area1[this.data.areaIndex1]
      })
      ref.child("users").push({
        "name": e.detail.value.name,
        "tel": e.detail.value.tel,
        "rengonghao": e.detail.value.adr,
        "banli": this.data.area[this.data.areaIndex],
        "dizhi": this.data.area1[this.data.areaIndex1]
      });

    }

  }

})
