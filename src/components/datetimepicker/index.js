function init ({placeholder, data, minDate, maxDate}) {
  this.placeholder = placeholder
  this.data = data
  this.minDate = minDate || '1600-01-01'
  this.maxDate = maxDate || '2099-12-31'
}
export default init
