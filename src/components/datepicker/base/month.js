import './month.less'
function init (params) {
  this.month = params.month
  this.year = params.year
  // 选择月份
  this.handleMonthClick = (val) => {
    this.month(val)
  }
  // 前十年
  this.lastyear = () => {
    this.year(this.year() - 1)
  }
  // 后十年
  this.nextyear = () => {
    this.year(this.year() + 1)
  }
}

export default init
