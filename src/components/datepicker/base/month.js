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
}

export default init
