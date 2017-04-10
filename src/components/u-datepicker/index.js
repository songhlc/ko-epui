/* iuap datepicer */
import {CreatApp, CustomIconCls} from '../base'

function createDate (params, componentInfo) {
  let umeta = {'type': 'u-date', 'format': 'YYYY-MM-DD'}
  // 自定义样式
  CustomIconCls(params, componentInfo, 'span')
  CreatApp(componentInfo, umeta, params)
}
export default createDate
