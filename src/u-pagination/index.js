import {CreatApp} from '../base'
function createDropdown (params, componentInfo) {
  let umeta = {'type': 'pagination'}
  console.log(params)
  CreatApp(componentInfo, umeta, params)
}
export default createDropdown
