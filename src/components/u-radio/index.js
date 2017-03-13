/* iuap datepicer */
import {CreatApp} from '../base'
function createDate (params, componentInfo) {
  let umeta = {'type': 'u-radio'}
  var dom = componentInfo.element.children[0]
  dom.children[0].childNodes[0].setAttribute('name', Math.random())
  CreatApp(componentInfo, umeta, params)
}
export default createDate
