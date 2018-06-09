const app = getApp()
var action = require('../../utils/action.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:2,
    latitude:'',
    longitude:'',
    deli_arr:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gohere();
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var r =this
    setTimeout(function(){
      r.delivery_info();
    },500)
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
  ch_type:function(e){
    var th = this;
    th.setData({
      type: e.currentTarget.dataset.type
    })
  },
  longTap:function(e){
    console.log(e)
    var t = this
    var del_id = e.currentTarget.id
    t.setData({
      del_id: e.currentTarget.id
    })
    wx.showModal({
      title: '删除收藏',
      content: '确认删除投递吗？',
      success: function (res) {
        if (res.confirm) {
          t.delivery_delete()
          console.log('删除成功')
        } else if (res.cancel) {
          console.log('')
        }
      }
    })
  },

  //删除投递简历的接口
  delivery_delete: function () {
    var r = this
    action.delivery_delete(r.data.del_id, app.globalData.openid).then(function (e) {
      if (e.info == 1) {
        wx.showToast({
          title: '删除投递成功',
          icon: 'success',
          duration: 2000
        })
        r.delivery_info()
      } else {
        wx.showToast({
          title: '删除投递失败',
          icon: 'none',
          duration: 2000
        })
        
      }
    })
  },
  gohere: function () {
    var r = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        r.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  },
  
  //我的投递列表
  delivery_info:function(){
    var r = this
    action.delivery_info(r.data.longitude, r.data.latitude, app.globalData.openid).then(function (e) {
      console.log(e)
      r.setData({
        deli_arr: e.delivery_info
      })
    })
  },

  //下拉刷新
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    this.delivery_info()
    wx.showToast({
      title: '刷新成功',
      icon: 'success',
      duration: 2000
    })
  },
})