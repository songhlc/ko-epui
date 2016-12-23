/* iuap datepicer */
import _ from 'lodash'
function createDate (params, componentInfo) {
  let dom = componentInfo.element.children[0]
  let umeta = {'type': 'u-date', 'format': 'YYYY-MM-DD'}
  umeta = _.extend(umeta, params.umeta)
  dom.setAttribute('u-meta', JSON.stringify(umeta))
  let vm = {
  }
  vm = _.extend(vm, params.data)
  window.app.createComp(dom, vm)
}
export default createDate
