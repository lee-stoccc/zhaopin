import WxValidate from '../../utils/WxValidate.js'
var Validate = ""
var appInstance = getApp();
var action = require('../../utils/action.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:'',
    err: '123',
    dis: 0,
    name: '',
    sex: '',
    tel: '',
    add: '',
    jobtime: '',
    email: '',
    jobfor: '',
    jobadd: '',
    jobpri: '',
    jobhan: '',
    sta: '',
    birddate: '',
    startstudy: '',
    endstudy: '',
    startjob: '',
    endjob: '',
    sexs: ['男', '女'],
    index: '',
    study: '',
    school: '',
    pro: '',
    company: '',
    comjob: '',
    comhan: '',
    compri: '',
    comdes: '',
    des: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.search_form()
    const rules = {
      name: {
        required: true,
        minlength: 2,
        maxlength: 10
      },
      tel: {
        required: true,
        tel: true,
      },
      email: {
        required: true,
        email: true,
      },
      jobfor: {
        required: true,
        minlength: 2,
        maxlength: 10
      },
      jobadd: {
        required: true,
        minlength: 2,
        maxlength: 20
      },
    } 
    const messages = {
      name: {
        required: '请输入姓名',
      },
      email: {
        required: '请输入邮箱',
        email: '请输入正确的邮箱',
      },
      tel: {
        required: '请输入手机号',
        tel: '请输入正确的手机号',
      },
      jobfor: {
        required: '请输入你的求职意向',
        minlength:'请输入正确工作职位',
        maxlength: '请输入正确工作职位'
      },
      jobadd: {
        required: '请输入你的意向工作地点',
        minlength: '请输入正确工作地点',
        maxlength: '请输入正确工作地点'
      },

    }  
    Validate = new WxValidate(rules, messages)   
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
  formSubmit: function (e) {
    var t = this
    var t=this
    //提交错误描述
    const params = e.detail.value
    // 传入表单数据，调用验证方法  
    if (!Validate.checkForm(e)) {
      const error = Validate.errorList[0]
      //提示信息  
      console.log(error)
      t.setData({
        err:error.msg,
        dis:1
      })
      // 控制错误提示信息
      var settime=setTimeout(function(){
          t.setData({
            dis:0
          })
      },2000)
      return false
    }else{
      action.add_form(
        getApp().globalData.openid,
        e.detail.value.name,
        e.detail.value.add,
        e.detail.value.comdes,
        e.detail.value.comhan,
        e.detail.value.comjob,
        e.detail.value.company,
        e.detail.value.compri,      
        e.detail.value.email,
        e.detail.value.des,
        e.detail.value.jobadd,
        e.detail.value.jobfor,
        e.detail.value.jobhan,
        e.detail.value.jobpri,
        e.detail.value.jobtime,
        e.detail.value.pro,
        e.detail.value.school,
        e.detail.value.sta,
        e.detail.value.study,
        e.detail.value.tel,
        t.data.sex,
        t.data.startstudy,
        t.data.endstudy,
        t.data.startjob,
        t.data.endjob,
        t.data.birddate
      ).then(function (e) {
        if(e.info==1){
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
        }else{
          wx.showToast({
            title: '请更新简历',
            icon: 'success',
            duration: 2000
          })
        }
        
      },function(){
        wx.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 2000
        })
      })
    }
  },
  //出生日期选择
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      birddate: e.detail.value
    })
  },
  startstudy: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startstudy: e.detail.value
    })
  },
  endstudy: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endstudy: e.detail.value
    })
  },
  startjob: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startjob: e.detail.value
    })
  },
  endjob: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endjob: e.detail.value
    })
  },
  sexs: function (e) {
    console.log(e)
    var r = this
    if (e.detail.value == 0) {
      r.setData({
        sex: '男'
      })
    } else {
      r.setData({
        sex: '女'
      })
    }
    this.setData({
      index: e.detail.value
    })
  },
  search_form:function(){
    var r = this
    action.search_form(getApp().globalData.openid).then(function(e){
      console.log(e)
        if(e.info.sex=='男'){
          r.setData({
            index:0
          })
        }else{
          r.setData({
            index:1
          })
        }
        r.setData({
            info:e.info,
            birddate: e.info.birddate,
            startstudy: e.info.startstudy,
            endstudy: e.info.endstudy,
            startjob: e.info.startjob,
            endjob: e.info.endjob
        })
    })
  }
})