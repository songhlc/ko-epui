// 增加布局信息
function addLayoutClass (element, params) {
  if (params.xs) {
    element.classList.add('u-col-xs-' + params.xs)
  }
  if (params.sm) {
    element.classList.add('u-col-sm-' + params.sm)
  }
  if (params.md) {
    element.classList.add('u-col-md-' + params.md)
    if (params['md-offset']) {
      element.classList.add('u-col-md-offset-' + params['md-offset'])
    }
  }
  if (params.lg) {
    element.classList.add('u-col-lg-' + params.lg)
  }
}
export {
  addLayoutClass
}
