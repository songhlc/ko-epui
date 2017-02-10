
/* iuap switch */
function createDropdown (params, componentInfo) {
  let dom = componentInfo.element.children[0]
  let option = params.option
  if (option && option.title && typeof option.title === 'function') {
    option.title = option.title()
  }
  new window.u.Tooltip(dom, params.option)
}
export default createDropdown
