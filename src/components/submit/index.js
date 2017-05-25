/* global ko */
import {debounce} from 'lodash'
function init (params) {
  this.text = ko.observable(params.text || '')
  this.click = _.debounce(function () {
    // 加入4s内防止再次点击机制，一旦点击发送click事件则4s内不再提交
    if (flag) {
      params.click()
      flag = false
      var timeout = setTimeout(function () {
        flag = true;
        timeout = null;
      }, 4000)
    }
  }, params.debounce || 300, { 'maxWait': params.maxWait || 2000 })
}
export default init
