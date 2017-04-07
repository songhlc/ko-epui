/* iuap select(dropdown) */
import {CreatApp} from '../base'
function createDropdown (params, componentInfo) {
  let umeta = {'type': 'u-combobox'}
  let dom = componentInfo.element.children[0]
  if (params.vm) {
    if (params.vm.placeholder) {
      let element = dom.getElementsByTagName('input')[0]
      element.attributes.placeholder.nodeValue = params.vm.placeholder
    }
  }
  CreatApp(componentInfo, umeta, params)
}
export default createDropdown
