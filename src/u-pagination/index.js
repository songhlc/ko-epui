import {CreatApp} from '../base'
function createDropdown (params, componentInfo) {
  let umeta = {'type': 'pagination'}
  if (params.vm && params.vm.sizeChange) {
    umeta.sizeChange = 'sizeChange'
  }
  if (params.vm && params.vm.pageChange) {
    umeta.pageChange = 'pageChange'
  }
  CreatApp(componentInfo, umeta, params)
}
export default createDropdown
