/* iuap datepicer */
import {CreatApp} from '../base'

function createDate (params, componentInfo) {
  let umeta = {'type': 'u-date', 'format': 'YYYY-MM-DD'}
  CreatApp(componentInfo, umeta, params)
}
export default createDate
