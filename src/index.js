import './index.less'
import datepicker from './components/datepicker'
import datetimepicker from './components/datetimepicker'
import dropdown from './components/dropdown'
/* eslint-disable */
Date.prototype._format = function (fmt) { // author: songhlc
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
/* global ko */
// 组件列表
const normalcomplist = ['box', 'box-tabs', 'box-filter', 'box-content', 'state-item', 'state-tabs', 'box-sticky', 'submit', 'step-legend', 'casitem', 'cascader']
// iuap 组件
const createcomplist = ['u-datepicker', 'u-select', 'u-switch', 'u-checkbox', 'u-radio', 'u-year', 'u-month', 'u-yearmonth', 'u-currency', 'u-tree', 'u-input', 'u-tooltip', 'u-pagination', 'form-group', 'form-title', 'form-text', 'form-ctn']
// 自定义指令
const bindingHandlers = ['ko-currency', 'hideInNewWindow', 'repeatSubmit', 'repeatClick', 'clickoutside']
// 注册普通组件
function registerComponent (name) {
  ko.components.register(name, {
    viewModel: require('./components/' + name + '/index').default,
    // template: { fromUrl: name},
    template: require('./components/' + name + '/index.html')
  })
}
// 注册iuap组件
function registerCreateComponent (name) {
  ko.components.register(name, {
    viewModel: {
      createViewModel: require('./components/' + name + '/index').default
    },
    // template: { fromUrl: name},
    template: require('./components/' + name + '/index.html')
  })
}
// 注册指令
function registerBindingHandlers (name) {
  let binding = require('./bindingHandlers/' + name + '/index').default
  ko.bindingHandlers[name] = binding
}
// 初始化公用组件
normalcomplist.forEach(function (item) {
  registerComponent(item)
})
// 初始化iuap组件和需要获取dom的组件
createcomplist.forEach(function (item) {
  registerCreateComponent(item)
})
// 初始化自定义指令
bindingHandlers.forEach(function (item) {
  registerBindingHandlers(item)
})
function register (model) {
  debugger
  ko.components.register(model.name, {
    viewModel: model.init,
    template: model.template
  })
}
register(datepicker)
register(datetimepicker)
register(dropdown)
export default ko
