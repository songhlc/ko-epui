import './year.less'
/* global ko */
function init (params) {
  // 实际选择的年份
  this.year = params.year
  this._year = ko.observable(params.year())
  // 监控开始年份
  this.startyear = ko.computed(function () {
    return Math.floor(this._year() / 10) * 10
  }, this)
  // 选择年份
  this.handleYearClick = (val) => {
    this.year(this.startyear() + val)
    params.showyear(false)
    params.showmonth(true)
  }
  // 前十年
  this.last10year = () => {
    this._year(this._year() - 10)
  }
  // 后十年
  this.next10year = () => {
    this._year(this._year() + 10)
  }
}

export default init
