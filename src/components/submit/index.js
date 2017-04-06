/* global ko */
import {debounce} from 'lodash'
function init (params) {
  this.text = ko.observable(params.text || '')
  this.click = debounce(params.click, params.debounce || 300, { 'maxWait': params.maxWait || 2000 })
}
export default init
