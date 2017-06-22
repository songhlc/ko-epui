import {debounce} from 'lodash'
// repeatClick，防止重复点击 用于按钮,debounce防抖 + 3s内无法再次点击
const repeatClick = {
  init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
    var continueTrigger = true
    var repeatSubmit = debounce(function (event, cb) {
      if (continueTrigger) {
        cb(event)
        continueTrigger = false
        setTimeout(function () {
          continueTrigger = true
        }, 2500)
      }
    }, 300)

    element.addEventListener('click', function (event) {
      repeatSubmit(event, valueAccessor())
    })
  }
}
export default repeatClick

