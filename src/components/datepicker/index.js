import './index.less'
import '../util'
/* global ko */
// function registComponennt (name) {
//   ko.components.register('datepicker-' + name, {
//     viewModel: require('./base/' + name).default,
//     // template: { fromUrl: name},
//     template: require('./base/' + name + '.html')
//   })
// }
// // let components = ['date', 'year', 'month']
// let components = ['year', 'month', 'day', 'timer']
// components.forEach((name) => {
//   registComponennt(name)
// })

ko.components.register('datepicker-year', {
  viewModel: require('./base/year').default,
  template: require('./base/year.html')
})

ko.components.register('datepicker-month', {
  viewModel: require('./base/month').default,
  template: require('./base/month.html')
})

ko.components.register('datepicker-day', {
  viewModel: require('./base/day').default,
  template: require('./base/day.html')
})

ko.components.register('datepicker-timer', {
  viewModel: require('./base/timer').default,
  template: require('./base/timer.html')
})
const DATEFORMAT = 'yyyy-MM-dd'
const DATETIMEFORMAT = 'yyyy-MM-dd hh:mm:ss'
// 获取元素距离窗口左侧距离
const getElementLeft = function (element) {
  var actualLeft = element.offsetLeft
  var current = element.offsetParent
  while (current !== null) {
    actualLeft += current.offsetLeft
    current = current.offsetParent
  }
  return actualLeft
}
function init ({placeholder, data, isTimer = false, lang = 'zh'}) {
  var that = this
  this.lang = lang
  this.isTimer = isTimer
  this.placeholder = placeholder
  this.data = data
  this.year = ko.observable()
  this.month = ko.observable()
  this.day = ko.observable()
  this.hour = ko.observable(0)
  this.minutes = ko.observable(0)
  this.seconds = ko.observable(0)
  this.data.subscribe((value) => {
    this.generateDate(value)
  })
  // 生成初始化的值
  this.generateDate = (value) => {
    var _date = value ? (new Date(value)) : (new Date())
    this.year(_date.getFullYear())
    this.month(_date.getMonth() + 1)
    this.day(_date.getDate())
    if (this.isTimer) {
      this.hour(_date.getHours())
      this.minutes(_date.getMinutes())
      this.seconds(_date.getSeconds())
    }
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

  this.hour.subscribe((value) => {
    if (this.isTimer) {
      this.bindModelValue()
    }
  })
  this.minutes.subscribe((value) => {
    if (this.isTimer) {
      this.bindModelValue()
    }
  })
  this.seconds.subscribe((value) => {
    if (this.isTimer) {
      this.bindModelValue()
    }
  })
  this.isPopup = ko.observable(false)
  // 显示对应输入框
  this.showyear = ko.observable(false)
  this.showmonth = ko.observable(false)
  this.showday = ko.observable(true)
  this.showtimer = ko.observable(false)

  this.alignright = ko.observable(false)
  // 选中输入框
  this.focus = (data, event) => {
    let leftPosition = getElementLeft(event.target)
    // 获取viewport 宽度
    let screenWidth = document.documentElement.clientWidth
    try {
      // 如果元素距离右侧的距离小于280 则将弹出浮动款左移，设置right：0
      if (screenWidth - leftPosition < 280) {
        this.alignright(true)
      } else {
        this.alignright(false)
      }
    } catch (e) {
      console.error(e)
    }
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
    // 如果不是时间选择,则直接关闭窗口
    if (!(this.isTimer)) {
      this.closeModal()
    }

    let _date
    if (this.isTimer) {
      _date = new Date(this.year(), this.month() - 1, this.day(), this.hour(), this.minutes(), this.seconds()).Format(DATETIMEFORMAT)
    } else {
      _date = new Date(this.year(), this.month() - 1, this.day()).Format(DATEFORMAT)
    }

    that.data(_date)
  }
  //
  this.confirm = () => {
    this.bindModelValue()
    this.closeModal()
  }
  this.timerpanel = () => {
    this.showtimer(!(this.showtimer()))
  }
  this.choosenow = () => {
    let _date
    if (this.isTimer) {
      _date = new Date().Format(DATETIMEFORMAT)
    } else {
      _date = new Date().Format(DATEFORMAT)
    }
    that.data(_date)
    this.closeModal()
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
