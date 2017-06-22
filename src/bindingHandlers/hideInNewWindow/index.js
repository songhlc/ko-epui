// 如果是新窗口打开的页面，则认为history.length == 1 或小于1 则将元素隐藏
// 用于一些同一个页面由不同种方式打开 返回按钮需要去掉的特殊需求
const hiddeninnewwindow = {
  init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
    if (window.history.length <= 1) {
      element.style.display = 'none'
    }
  }
}
export default hiddeninnewwindow
