import './index.less'
import '../util'
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

function init ({placeholder, data, isTimer = false}) {
  var that = this
  this.isTimer = isTimer
  this.placeholder = placeholder
  this.data = data
  this.year = ko.observable()
  this.month = ko.observable()
  this.day = ko.observable()
  this.data.subscribe((value) => {
    this.generateDate(value)
  })
  // 生成初始化的值
  this.generateDate = (value) => {
    var _date = value ? (new Date(value)) : (new Date())
    this.year(_date.getFullYear())
    this.month(_date.getMonth() + 1)
    this.day(_date.getDate())
  }
  // 初始化值
  this.generateDate()
  this.year.subscribe((value) => {
    console.log('parent.subscribe year:' + value)
    this.showyear(false)
    this.showmonth(true)
    // 监听年选中
  })

  this.month.subscribe((value) => {
    console.log('parent.subscribe month:' + value)
    this.showmonth(false)
    this.showday(true)
  })

  this.day.subscribe((value) => {
    console.log('parent.subscribe day:' + value)
    if (!this.isTimer) {
      this.bindModelValue()
    }
  })
  this.isPopup = ko.observable(false)
  // 显示对应输入框
  this.showyear = ko.observable(false)
  this.showmonth = ko.observable(false)
  this.showday = ko.observable(true)
  // 选中输入框
  this.focus = () => {
    this.isPopup(true)
    this.showyear(false)
    this.showmonth(false)
    this.showday(true)
  }
  // 遮罩点击
  this.maskClick = function () {
    that.isPopup(false)
  }
  // 绑定最终选择的模型
  this.bindModelValue = () => {
    this.closeModal()
    let _date = new Date(this.year(), this.month() - 1, this.day()).Format('yyyy-MM-dd')
    that.data(_date)
  }
  //
  this.confirm = () => {
    this.bindModelValue()
  }
  // 关闭弹框
  this.closeModal = () => {
    this.showyear(false)
    this.showmonth(false)
    this.showday(false)
    this.isPopup(false)
  }
}

export default init
