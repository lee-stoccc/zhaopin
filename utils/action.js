'use strict'
var config = require('./config.js')

function fetchApi(url, params, complete) {
  return config.fetch(url, params, complete)
}

function banner() {
  return fetchApi('index/index/banner').then(function (res) {
    return res.data;
  });
}
function area() {
  return fetchApi('index/index/area').then(function (res) {
    return res.data;
  });
}

// 首页分类
function classify() {
  return fetchApi('index/index/classify').then(function (res) {
    return res.data;
  });
}

// 获取最新列表
function newest_info(latitude, longitude, area_id,key) {
  return fetchApi('index/index/newest_info', { "latitude": latitude, "longitude":longitude, "area_id": area_id, "key": key}).then(function (res) {
    return res.data;
  });
}


// 获取最近列表
function recent_info(latitude, longitude, area_id,key) {
  return fetchApi('index/index/recent_info', { "latitude": latitude, "longitude":longitude,"area_id": area_id,"key": key }).then(function (res) {
    return res.data;
  });
}

// 招聘详细页面
function detail_info(latitude, longitude, detail_id, openid) {
  return fetchApi('index/index/detail_info', { "longitude": longitude, "latitude": latitude, "detail_id": detail_id, "openid": openid }).then(function (res) {
    return res.data;
  });
}

// 查询收藏列表
function collection_info(longitude, latitude, openid) {
  return fetchApi('index/index/collection_info', { "longitude": longitude, "latitude": latitude, "openid": openid }).then(function (res) {
    return res.data;
  });
}

// 收藏
function collection_add(info_id, openid) {
  return fetchApi('index/index/collection_add', { "info_id": info_id, "openid": openid }).then(function (res) {
    return res.data;
  });
}

// 删除收藏
function collection_delete(info_id, openid) {
  return fetchApi('index/index/collection_delete', { "info_id": info_id, "openid": openid }).then(function (res) {
    return res.data;
  });
}

// 投递简历
function delivery_add(info_id, openid) {
  return fetchApi('index/index/delivery_add', { "info_id": info_id, "openid": openid }).then(function (res) {
    return res.data;
  });
}

// 删除简历
function delivery_delete(info_id, openid) {
  return fetchApi('index/index/delivery_delete', { "info_id": info_id, "openid": openid }).then(function (res) {
    return res.data;
  });
}

// 简历列表
function delivery_info(longitude, latitude, openid) {
  return fetchApi('index/index/delivery_info', { "longitude": longitude, "latitude": latitude, "openid": openid }).then(function (res) {
    return res.data;
  });
}

//填写简历
function add_form(openid, name, add, comdes, comhan, comjob, company, compri, email, des, jobadd, jobfor, jobhan, jobpri, jobtime, pro, school, sta, study, tel, sex, startstudy, endstudy, startjob, endjob, birddate) {
  return fetchApi('index/index/add_form', {
    "openid": openid,
    "name": name,
    "add": add,
    "comdes": comdes,
    "comhan": comhan,
    "comjob": comjob,
    "company": company,
    "compri": compri,
    "email": email,
    "des": des,
    "jobadd": jobadd,
    "jobfor": jobfor,
    "jobhan": jobhan,
    "jobpri": jobpri,
    "jobtime": jobtime,
    "pro": pro,
    "school": school,
    "sta": sta,
    "study": study,
    "tel": tel,
    "sex": sex,
    "startstudy": startstudy,
    "endstudy": endstudy,
    "startjob": startjob,
    "endjob": endjob,
    "birddate": birddate,
  }).then(function (res) {
    return res.data;
  });
}


// 读取简历列表
function search_form(openid) {
  return fetchApi('index/index/search_form', {"openid": openid }).then(function (res) {
    return res.data;
  });
}

module.exports = {
  banner: banner,
  area: area,
  classify: classify,
  newest_info: newest_info,
  recent_info: recent_info,
  detail_info: detail_info,
  collection_info: collection_info,
  collection_add: collection_add,
  collection_delete: collection_delete,
  delivery_add: delivery_add,
  delivery_delete: delivery_delete,
  delivery_info: delivery_info,
  add_form: add_form,
  search_form: search_form
}