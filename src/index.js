import './index.less'
/* global ko */
// 组件列表
const normalcomplist = ['box', 'box-tabs', 'box-filter', 'box-content', 'state-item', 'state-tabs', 'box-sticky', 'submit', 'datepicker', 'datetimepicker']
// iuap 组件
const createcomplist = ['u-datepicker', 'u-select', 'u-switch', 'u-checkbox', 'u-radio', 'u-year', 'u-month', 'u-yearmonth', 'u-currency', 'u-tree', 'u-input', 'u-tooltip', 'u-pagination', 'form-group', 'form-title', 'form-text', 'form-ctn']
// 自定义指令
const bindingHandlers = ['ko-currency']
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

export default ko
