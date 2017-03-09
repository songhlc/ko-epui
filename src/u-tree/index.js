
/* iuap switch */
import {CreatApp} from '../base'
function createDropdown (params, componentInfo) {
  let umeta = {'type': 'tree'}
  if (params.vm && params.vm.setting) {
    umeta.setting = 'setting'
  }
  CreatApp(componentInfo, umeta, params)
}
export default createDropdown
