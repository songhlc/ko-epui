let ko = window.ko
function init (params) {
  this.items = params.items
  let curstate = params.items()[params.index || 0].state
  this.curState = ko.observable(curstate)
  this.handler = (msg) => {
    this.curState(msg.state)
    params.handler(msg)
  }
  // params.handler
}

export default init
