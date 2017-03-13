function init (params) {
  this.title = params.title
  this.count = params.count
  this.active = params.active ? params.active : false
  this.click = params.click
  this.state = params.state
}

export default init
