
/* iuap switch */
import {CreatApp} from '../base'
function createDropdown (params, componentInfo) {
  let umeta = {'type': 'u-switch', 'checkedValue': '1', 'unCheckedValue': '0'}
  CreatApp(componentInfo, umeta, params)
}
export default createDropdown
