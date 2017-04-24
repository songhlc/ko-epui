import './index.less'
/* global ko */
function registComponennt (name) {
  ko.components.register('datepicker-' + name, {
    viewModel: require('./base/' + name).default,
    // template: { fromUrl: name},
    template: require('./base/' + name + '.html')
  })
}
// let components = ['date', 'year', 'month']
let components = ['year', 'month', 'day']
components.forEach((name) => {
  registComponennt(name)
})

function init (params) {
  this.year = ko.observable(2017)
  this.year.subscribe((value) => {
    console.log('parent.subscribe year:' + value)
    // 监听年选中
  })
  this.month = ko.observable(4)
  this.month.subscribe((value) => {
    console.log('parent.subscribe month:' + value)
  })
  this.day = ko.observable(21)
}

export default init
