/*
* params:{
*   md: 4   // form-group一共占据几列 默认按照栅格化布局来 相当于设置样式u-col-4 不设置和md的效果一样
*   sm: 3   // 相当于样式u-col-sm-3
*   xs: 12  // 相当于设置u-col-xs-12
*   lg: 6  //相当于设置u-col-lg-6
* }
*
* */
import {addLayoutClass} from '../util'
function init (params, componentInfo) {
  let element = componentInfo.element.children[0]
  if (params.text) {
    element.innerHTML = params.text
  }
  addLayoutClass(element, params)
}
export default init
