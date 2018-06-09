'use strict'

var apiUrl ='https://v023.suyongw.com/';
function fetch(url,params,complete){
  return new Promise(function(resolve,reject){
    wx.request({
      url: apiUrl+url,
      method:'POST',
      data: Object.assign({}, params),
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success:resolve,
      fail:reject,
      complete:complete
    })
  })
}

module.exports={
  fetch:fetch,
  apiUrl: apiUrl
}