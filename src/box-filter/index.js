function init (params) {
  this.title = params.title
  this.q = params.q
  this.query = params.query
  this.placeholder = params.placeholder
  if (params.query) {
    this.qhidden = true
  } else {
    this.qhidden = false
  }
}

export default init
