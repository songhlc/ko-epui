import ko from 'knockout'
import './index.less'
window.ko = ko
let complist = ['box', 'box-tabs', 'box-filter', 'box-content', 'state-item', 'query-tabs', 'state-tabs']
let iuapcomplist = ['u-datepicker', 'u-select', 'u-switch', 'u-checkbox', 'u-radio', 'u-year', 'u-month', 'u-yearmonth', 'u-currency']
// 注册普通组件
function register (name) {
  ko.components.register(name, {
    viewModel: require('./' + name + '/index').default,
      // template: { fromUrl: name},
    template: require('./' + name + '/index.html')
  })
}
// 注册iuap组件
function registerIuapComponent (name) {
  ko.components.register(name, {
    viewModel: {
      createViewModel: require('./' + name + '/index').default
    },
    // template: { fromUrl: name},
    template: require('./' + name + '/index.html')
  })
}
// 初始化公用组件
complist.forEach(function (item) {
  register(item)
})
// 初始化iuap组件
iuapcomplist.forEach(function (item) {
  registerIuapComponent(item)
})
export default ko
