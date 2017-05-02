// 增加布局信息
function addLayoutClass (element, params) {
  if (params.xs) {
    element.classList.add('u-col-xs-' + params.xs)
  }
  if (params.sm) {
    element.classList.add('u-col-sm-' + params.sm)
  }
  if (params.md) {
    element.classList.add('u-col-md-' + params.md)
    if (params['md-offset']) {
      element.classList.add('u-col-md-offset-' + params['md-offset'])
    }
  }
  if (params.lg) {
    element.classList.add('u-col-lg-' + params.lg)
  }
}

// 日期格式化
/* eslint-disable */
Date.prototype.Format = function (fmt) { // author: songhlc
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}
/* eslint-disable */

export {
  addLayoutClass
}
