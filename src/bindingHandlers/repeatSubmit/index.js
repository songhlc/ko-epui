import {debounce} from 'lodash'
// submitclick指令，防止重复点击，用于form submit,debounce防抖 + 3s内无法再次点击
const repeatSubmit = {
  init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
    let continueTrigger = true
    let repeatSubmit = debounce(function (event, cb) {
      if (continueTrigger) {
        cb(event)
        continueTrigger = false
        setTimeout(function () {
          continueTrigger = true
        }, 2500)
      }
    }, 300)
    element.addEventListener('submit', function (event) {
      repeatSubmit(event, valueAccessor())
      event.preventDefault()
      return false
    })
  }
}
export default repeatSubmit
