import { getFirstDayOfMonth, getDayCountOfMonth, getWeekNumber, getStartDateOfMonth, setData } from '../util'
var ko = window.ko
const DAY_DURATION = 86400000 // 1天
const clearHours = function (time) {
  const cloneDate = new Date(time)
  cloneDate.setHours(0, 0, 0, 0)
  return cloneDate.getTime()
}

function init (params) {
  let that = this
  this.month = params.month
  this.year = params.year
  this.showYear = ko.computed(function () {
    return this.year() + '年'
  }.bind(this))
  this.showMonth = ko.computed(function () {
    return this.month() + '月'
  }.bind(this))
  this.day = params.day
  this.tableRows = ko.observableArray([ko.observableArray([]), ko.observableArray([]), ko.observableArray([]), ko.observableArray([]), ko.observableArray([]), ko.observableArray([])])
  // todo
  this.firstDayOfWeek = ko.observable(7)
  // 开始日期
  this.startDate = ko.computed(function () {
    return getStartDateOfMonth(this.year(), this.month())
  }, this)
  this.disabledDate = function (time) {
    if (params.minDate() && clearHours(time) <= clearHours(new Date(params.minDate()))) {
      return true
    } else if (params.maxDate() && clearHours(time) >= clearHours(new Date(params.maxDate()))) {
      return true
    } else {
      return false
    }
  }

  this.showWeekNumber = false
  this.offsetDay = ko.computed(function () {
    const week = this.firstDayOfWeek()
    // 周日为界限，左右偏移的天数，3217654 例如周一就是 -1，目的是调整前两行日期的位置
    return week > 3 ? 7 - week : -week
  }, this)
  // 选择日期
  this.handleDayClick = function (cell) {
    if (cell.disabled) {
      return
    }
    let year = this.year()
    let month = this.month()
    let day = cell.text
    // 跨页选取
    if (cell.type === 'prev-month') {
      if (month === 1) {
        year--
        month = 12
      } else {
        month--
      }
    } else if (cell.type === 'next-month') {
      if (month === 12) {
        year++
        month = 1
      } else {
        month++
      }
    }
    // 切换到其他月份的时候
    setData((new Date(year, month - 1, day, params.hour(), params.minutes(), params.seconds()))._format(params.isTimer ? 'yyyy-MM-dd hh:mm:ss' : 'yyyy-MM-dd'), params.data, params.isNumbericValue)
  }
  // 判断是否当前天
  this.isSelectedDay = (cellType, cellDay) => {
    if (cellType === 'normal') {
      // fix ie and edge new date bug
      if (params.data()) {
        var _date = new Date((params.data() + '').replace(/-/g, '/'))
        if (cellDay === this.day() && this.month() === (_date.getMonth() + 1) && this.year() === (_date.getFullYear())) {
          return true
        }
      } else {
        return false
      }
    } else {
      return false
    }
  }
  // 年份选择
  this.chooseyear = function () {
    params.showyear(true)
    params.showday(false)
  }
  // 月份选择
  this.choosemonth = function () {
    params.showmonth(true)
    params.showday(false)
  }
  this.lastyear = () => {
    this.year(this.year() - 1)
    this.showday()
  }
  this.lastmonth = () => {
    let curmonth = this.month()
    if (curmonth === 1) {
      this.year(this.year() - 1)
      this.month(12)
    } else {
      this.month(this.month() - 1)
    }
    this.showday()
  }
  this.nextyear = () => {
    this.year(this.year() + 1)
    this.showday()
  }
  this.nextmonth = () => {
    let curmonth = this.month()
    if (curmonth === 12) {
      this.year(this.year() + 1)
      this.month(1)
    } else {
      this.month(this.month() + 1)
    }
    this.showday()
  }
  this.showday = () => {
    params.showmonth(false)
    params.showday(true)
  }
  this.rows = ko.computed(function () {
    const date = new Date(this.year(), this.month() - 1, 1)
    let day = getFirstDayOfMonth(date) // day of first day
    const dateCountOfMonth = getDayCountOfMonth(date.getFullYear(), date.getMonth())
    const dateCountOfLastMonth = getDayCountOfMonth(date.getFullYear(), (date.getMonth() === 0 ? 11 : date.getMonth() - 1))
    day = (day === 0 ? 7 : day)
    const offset = this.offsetDay()
    const rows = this.tableRows()
    let count = 1
    let firstDayPosition
    const startDate = this.startDate()
    const disabledDate = this.disabledDate
    const now = clearHours(new Date())
    for (var i = 0; i < 6; i++) {
      // 每一行
      const row = rows[i]()
      if (this.showWeekNumber) {
        if (!row[0]) {
          row[0] = { type: 'week', text: getWeekNumber(new Date(startDate.getTime() + DAY_DURATION * (i * 7 + 1))) }
        }
      }
      for (var j = 0; j < 7; j++) {
        let cell = row[this.showWeekNumber ? j + 1 : j]
        if (!cell) {
          cell = { row: i, column: j, type: 'normal' }
        }
        cell['$parent'] = that
        cell.type = 'normal'
        const index = i * 7 + j
        const time = startDate.getTime() + DAY_DURATION * (index - offset)
        const isToday = time === now
        if (isToday) {
          cell.type = 'today'
        }
        if (i >= 0 && i <= 1) {
          if (j + i * 7 >= (day + offset)) {
            cell.text = count++
            if (count === 2) {
              firstDayPosition = i * 7 + j
            }
          } else {
            cell.text = dateCountOfLastMonth - (day + offset - j % 7) + 1 + i * 7
            cell.type = 'prev-month'
          }
        } else {
          if (count <= dateCountOfMonth) {
            cell.text = count++
            if (count === 2) {
              firstDayPosition = i * 7 + j
            }
          } else {
            cell.text = count++ - dateCountOfMonth
            cell.type = 'next-month'
          }
        }
        cell.disabled = typeof disabledDate === 'function' && disabledDate(new Date(time))
        if (this.showWeekNumber) {
          row[j + 1] = cell
        } else {
          row[j] = cell
        }
        // this.$set(row, this.showWeekNumber ? j + 1 : j, cell)
      }
      rows[i](row)
    }
    rows.firstDayPosition = firstDayPosition
    return rows
  }, this)
}

export default init
