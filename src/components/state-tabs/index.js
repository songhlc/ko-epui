function init (params) {
  this.items = params.items
  this.index = params.index
  this.handler = (msg, _index) => {
    this.index(_index)
    params.handler(msg)
  }
  // params.handler
}
export default init
