/* iuap select(dropdown) */
import _ from 'lodash'
function createDropdown (params, componentInfo) {
  let dom = componentInfo.element.children[0]
  let umeta = {'type': 'u-combobox'}
  umeta = _.extend(umeta, params.umeta)
  dom.setAttribute('u-meta', JSON.stringify(umeta))
  let vm = {
  }
  vm = _.extend(vm, params.data)
  window.app.createComp(dom, vm)
}
export default createDropdown
