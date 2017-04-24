import {getFirstDayOfMonth, getDayCountOfMonth, getWeekNumber, getStartDateOfMonth} from '../util'
/* global ko */
const DAY_DURATION = 86400000
const clearHours = function (time) {
  const cloneDate = new Date(time)
  cloneDate.setHours(0, 0, 0, 0)
  return cloneDate.getTime()
}

function init (params) {
  this.month = params.month
  this.year = params.year
  this.day = params.day
  this.tableRows = ko.observableArray([ ko.observableArray([]), ko.observableArray([]), ko.observableArray([]), ko.observableArray([]), ko.observableArray([]), ko.observableArray([]) ])
  // todo
  this.firstDayOfWeek = ko.observable(7)
  // 开始日期
  this.startDate = ko.computed(function () {
    return getStartDateOfMonth(this.year(), this.month())
  }, this)
  this.disabledDate = {}
  // 选择月份
  this.handleDayClick = (val) => {
    this.day(val)
  }
  this.showWeekNumber = false
  this.offsetDay = ko.computed(function () {
    const week = this.firstDayOfWeek()
    // 周日为界限，左右偏移的天数，3217654 例如周一就是 -1，目的是调整前两行日期的位置
    return week > 3 ? 7 - week : -week
  }, this)
  this.rows = ko.computed(function () {
    const date = new Date(this.year(), this.month(), 1)
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
      const row = rows[i]()
      if (this.showWeekNumber) {
        if (!row[0]) {
          row[0] = { type: 'week', text: getWeekNumber(new Date(startDate.getTime() + DAY_DURATION * (i * 7 + 1))) }
        }
      }
      for (var j = 0; j < 7; j++) {
        let cell = row[this.showWeekNumber ? j + 1 : j]
        if (!cell) {
          cell = { row: i, column: j, type: 'normal', inRange: false, start: false, end: false }
        }
        cell.type = 'normal'
        const index = i * 7 + j
        const time = startDate.getTime() + DAY_DURATION * (index - offset)
        cell.inRange = time >= clearHours(this.minDate) && time <= clearHours(this.maxDate)
        cell.start = this.minDate && time === clearHours(this.minDate)
        cell.end = this.maxDate && time === clearHours(this.maxDate)
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
      if (this.selectionMode === 'week') {
        const start = this.showWeekNumber ? 1 : 0
        const end = this.showWeekNumber ? 7 : 6
        const isWeekActive = this.isWeekActive(row[start + 1])
        row[start].inRange = isWeekActive
        row[start].start = isWeekActive
        row[end].inRange = isWeekActive
        row[end].end = isWeekActive
      }
      rows[i](row)
    }
    rows.firstDayPosition = firstDayPosition
    return rows
  }, this)
}

export default init
