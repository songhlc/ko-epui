import './month.less'
function init (params) {
  this.month = params.month
  this.year = params.year
  // 选择月份
  this.handleMonthClick = (val) => {
    this.month(val)
    params.showday(true)
    params.showmonth(false)
  }
  // 前十年
  this.lastyear = () => {
    this.year(this.year() - 1)
  }
  // 后十年
  this.nextyear = () => {
    this.year(this.year() + 1)
  }
  // 年份选择
  this.chooseyear = function () {
    params.showyear(true)
    params.showmonth(false)
  }
  this.month1 = '一月'
  this.month2 = '二月'
  this.month3 = '三月'
  this.month4 = '四月'
  this.month5 = '五月'
  this.month6 = '六月'
  this.month7 = '七月'
  this.month8 = '八月'
  this.month9 = '九月'
  this.month10 = '十月'
  this.month11 = '十一月'
  this.month12 = '十二月'
}

export default init
