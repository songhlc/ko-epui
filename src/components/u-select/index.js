/* iuap select(dropdown) */
import {CreatApp, CustomIconCls} from '../base'
function createDropdown (params, componentInfo) {
  let umeta = {'type': 'u-combobox'}
  // 自定义样式
  CustomIconCls(params, componentInfo, 'span')
  CreatApp(componentInfo, umeta, params)
}
export default createDropdown
