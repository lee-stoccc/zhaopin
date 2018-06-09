const app = getApp()
var action = require('../../utils/action.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coll_arr: [],
    latitude: '',
    longitude: '',
    del_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gohere()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var t = this
    setTimeout(function () {
      t.collection_info()
    }, 500)
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

  //查询经纬度
  gohere: function () {
    var r = this
    //获取经纬度F
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

  //收藏列表
  collection_info: function () {
    var r = this
    action.collection_info(r.data.longitude, r.data.latitude, app.globalData.openid).then(function (e) {
      r.setData({
        coll_arr: e.collection_info
      })
    })
  },

  //长按激活删除收藏函数
  longTap: function (e) {
    var del_id = e.currentTarget.id
    var t = this
    t.setData({
      del_id: e.currentTarget.id
    })
    wx.showModal({
      title: '删除收藏',
      content: '确认删除收藏吗？',
      success: function (res) {
        if (res.confirm) {
          t.collection_delete()
          console.log('删除成功')
        } else if (res.cancel) {
          console.log('')
        }
      }
    })
  },

  //删除收藏接口
  collection_delete: function () {
    var r = this
    action.collection_delete(r.data.del_id, app.globalData.openid).then(function (e) {
      if (e.info == 1) {
        wx.showToast({
          title: '移除收藏成功',
          icon: 'success',
          duration: 2000
        })
        r.collection_info()
      } else {
        wx.showToast({
          title: '移除收藏失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },


  //下拉刷新
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    this.collection_info()
    wx.showToast({
      title: '刷新成功',
      icon: 'success',
      duration: 2000
    })
  },
})