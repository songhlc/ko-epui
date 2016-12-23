var EventBus = {}
var U = window.u
function pagination (dom, vm, store, name) {
  var pag = document.createElement('div')
  pag.className = 'u-pagination'
  pag.setAttribute('options', JSON.stringify({'type': 'pagination', 'data': 'pagination'}))

  var container = document.createElement('div')
  container.className = 'text-center'
  container.appendChild(pag)
  dom.parentElement.appendChild(container)
  var comp = new U.pagination({ el: pag, showState: false })
  comp.on('pageChange', function (pageIndex) {
    store.load({
      pageIndex: pageIndex
    })
    window.global.hash('page', pageIndex)
  })

  EventBus.on('pagination.' + store._config.name, function (data) {
    comp.update({
      totalPages: data.totalPage,
      pageSize: data.pageSize,
      currentPage: data.pageIndex + 1,
      totalCount: data.totalCount})
  })

  // if(!page){
  //   return
  // }
  // //初始化信息
  if (store.data) {
    var page = store.data
    comp.update({
      totalPages: page.totalPage,
      pageSize: page.pageSize,
      currentPage: page.pageIndex + 1,
      totalCount: page.totalCount})
  }
}

export default pagination
