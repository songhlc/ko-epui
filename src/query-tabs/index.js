function init (params) {
  this.items = params.items
  let curstate = params.items()[params.index() || 0].state
  this.curState = curstate
  this.handler = (msg) => {
    let el = document.getElementById('query_tabs' + msg.state)
    el.checked = 'checked'
    params.handler(msg)
  }
  // params.handler
}

export default init
