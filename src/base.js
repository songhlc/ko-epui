import _ from 'lodash'
export function CreatApp (componentInfo, umeta, params) {
  let dom = componentInfo.element.children[0]
  let uMeta = _.extend(umeta, params.umeta)
  dom.setAttribute('u-meta', JSON.stringify(uMeta))
  let vm = {
  }
  vm = _.extend(vm, params.data)
  window.app.createComp(dom, vm)
}
