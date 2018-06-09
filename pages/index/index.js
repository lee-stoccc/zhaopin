var action = require('../../utils/action.js')
var util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    changecho: '',
    changetype: '1',
    height: '',
    dot: true,
    area: [],
    classify: ['广州', '北京'],
    longitude: '',
    latitude: '',
    newest_info: [],
    recent_info: [],
    area_id: '',
    area_name: '',
    key: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.banner();
    this.area();
    this.classify();
    this.getcocal();
    this.login();
  },

  login: function () {
    var t = this
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://192.168.1.110/zhaopin/public/index.php/index/index/login',
            data: {
              code: res.code
            },
            success: function (e) {

              getApp().globalData.openid = e.data.openid
            }
          })
          getApp().globalData.code = res.code
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  // 最近列表
  recent_info: function () {
    var t = this
    var la = t.data.latitude
    var lo = t.data.longitude
    var area_id = t.data.area_id;
    var key = t.data.key
    action.recent_info(la, lo, area_id, key).then(function (e) {
      if (e.info == 1) {
        // 已封装的距离转换器
        util.excount(e)
        t.setData({
          recent_info: e.recent_info
        })
      } else {
        t.setData({
          recent_info: []
        })
        console.log('请求网络数据失败或网络没数据')
      }
    })
  },
  // 最新列表
  newest_info: function () {
    var t = this
    var la = t.data.latitude
    var lo = t.data.longitude
    var area_id = t.data.area_id;
    var key = t.data.key
    action.newest_info(la, lo, area_id, key).then(function (e) {
      if (e.info == 1) {
        // 已封装的距离转换器
        util.excount2(e)
        t.setData({
          newest_info: e.newest_info
        })
      } else {
        t.setData({
          newest_info: []
        })
        console.log('请求网络数据失败或网络没数据')
      }
    })
  },
  classify: function () {
    var t = this
    action.classify().then(function (e) {
      if (e.info == 1) {

        t.setData({
          classify: e.classify
        })
      } else {
        console.log('请求网络数据失败或网络没数据')
      }
    })
  },
  banner: function () {
    var t = this
    action.banner().then(function (e) {
      if (e.info == 1) {
        t.setData({
          imgUrls: e.banner
        })
      } else {
        console.log('请求网络数据失败或网络没数据')
      }
    })
  },
  area: function () {
    var t = this
    action.area().then(function (e) {
      if (e.info == 1) {
        t.setData({
          area: e.area
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    setTimeout(function () {
      that.newest_info();
      that.recent_info()
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  changecho: function (e) {
    var _this = this;
    _this.setData({
      changetype: e.currentTarget.dataset.type
    })
    if (e.currentTarget.dataset.type == 1) {
      _this.recent_info()
    } else {
      _this.newest_info()
    }

  },
  todetail: function (e) {
    console.log(e)
    var detail_id = e.currentTarget.id
    var la_de = e.currentTarget.dataset.la
    var lo_de = e.currentTarget.dataset.lo
    var count = e.currentTarget.dataset.count

    wx.navigateTo({
      url: '/pages/detail/detail?la=' + la_de + "&lo_de=" + lo_de + "&detail_id=" + detail_id+"&count="+count
    })
  },
  getdis: function (e) {
    var th = this;
    console.log("你选择的地区是：" + e);
    th.setData({
      height: e.detail.y,
      dot: !th.data.dot   // 控制点击显示
    })
  },
  chos: function (e) {
    console.log(e)
    var th = this;
    th.setData({
      dot: !th.data.dot,
      area_id: e.target.id,
      area_name: e.currentTarget.dataset.n
    })
    //如果最近+地区触发查询最近列表函数
    if (th.data.changetype == 1) {
      th.recent_info()
    } else {
      th.newest_info()
    }
  },
  getcocal: function () {
    var t = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        t.setData({
          latitude: latitude,
          longitude: longitude
        })
      }
    })
  },
  onPullDownRefresh: function onPullDownRefresh() {
    console.log('下来刷新')
    wx.stopPullDownRefresh();
  },

  // 输入完成点击确认后触发
  bindconfirm: function (e) {
    var r = this
    console.log(e.detail.value)
    r.setData({
      key: e.detail.value
    })
    r.recent_info()
    r.setData({
      key: ''
    })
  },

  //下拉刷新
  onPullDownRefresh: function () {
    var t =this
    wx.stopPullDownRefresh()
    action.recent_info(t.data.latitude, t.data.longitude, '', '').then(function (e) {
      if (e.info == 1) {
        // 已封装的距离转换器
        util.excount(e)
        t.setData({
          recent_info: e.recent_info,
          changetype:'1'
        })
      } else {
        t.setData({
          recent_info: []
        })
        console.log('请求网络数据失败或网络没数据')
      }
    })
    wx.showToast({
      title: '刷新成功',
      icon: 'success',
      duration: 2000
    })
  },
})