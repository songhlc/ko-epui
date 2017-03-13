/* iuap select(dropdown) */
import {CreatApp} from '../base'
function createDropdown (params, componentInfo) {
  let umeta = {'type': 'u-combobox'}
  CreatApp(componentInfo, umeta, params)
}
export default createDropdown
