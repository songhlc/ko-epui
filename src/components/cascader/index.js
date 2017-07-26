/*
 * params:{
 *   data:
 *   selectedValue:
 * }
 *
 * */
function init (params, componentInfo) {
  this.data = params.data
  this.selectedValue = params.selectedValue
  this.casitmevisible = window.ko.observable(false)
  this.handleVisible = () => this.casitmevisible(true)
  this.handleClose = () => this.casitmevisible(false)
}
export default init
