var action = require('../../utils/action.js')
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow: 0,
    sumsg: '投递成功',
    detail: '',
    id: '',
    name_describe:'',
    count:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (o) {
    var r = this
    console.log(11)
    console.log(o)
    r.setData({
      id: o.detail_id,
      count:o.count
    })
    action.detail_info(o.la, o.lo_de, o.detail_id, getApp().globalData.openid).then(function (e) {
      console.log(e)

      if (e.info == 1) {
        var name_describe = e.detail_info.name_describe
        WxParse.wxParse('name_describe', 'html', name_describe, r);
        r.setData({
          detail: e.detail_info,
        })
      } else {
        console.log('无法请求网络或网络数据为空')
      }
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  gohere: function () {
    //获取经纬度F
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        //打开地图
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  },
  sent: function () {
    var t = this;
    t.delivery_add()
    setTimeout(function () {
      t.setData({
        isshow: 0
      })
    }, 2000)
  },
  onPullDownRefresh: function onPullDownRefresh() {
    console.log('下来刷新')
    wx.stopPullDownRefresh();
  },
  //添加收藏
  collection_add: function () {
    var r = this
    console.log(r.data.detail)
    action.collection_add(r.data.id, getApp().globalData.openid).then(function (e) {
      if (e.info == 1) {
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '已收藏',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  //投递简历
  delivery_add:function(){
    var r =this
    action.delivery_add(r.data.id, getApp().globalData.openid).then(function(e){
      if(e.info==0){
        r.setData({
          sumsg: '已投递无需重复',
          isshow: 1
        })
      }else{
        r.setData({
          sumsg: '投递成功',
          isshow: 1
        })
      }
    })
  }
})