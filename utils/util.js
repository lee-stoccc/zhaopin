const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function excount(e){
  for (let jj = 0; jj < e.recent_info.length; jj++) {
    var num1 = e.recent_info[jj].count.toString().indexOf('.')
    var res = e.recent_info[jj].count.toString().substring(0, num1)
    var num2 = parseInt(res);
    if (res > 1000) {
      var num3 = num2 / 1000
      e.recent_info[jj].count = num3 + 'km'
    } else {
      e.recent_info[jj].count = num2 + 'm'
    }
  }
}

function excount2(e) {
  for (let jj = 0; jj < e.newest_info.length; jj++) {
    var num1 = e.newest_info[jj].count.toString().indexOf('.')
    var res = e.newest_info[jj].count.toString().substring(0, num1)
    var num2 = parseInt(res);
    if (res > 1000) {
      var num3 = num2 / 1000
      e.newest_info[jj].count = num3 + 'km'
    } else {
      e.newest_info[jj].count = num2 + 'm'
    }
  }
}

module.exports = {
  formatTime: formatTime,
  excount: excount,
  excount2: excount2
}
