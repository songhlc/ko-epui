import _ from 'lodash'
export function CreatApp (componentInfo, umeta, params) {
  let dom = componentInfo.element.children[0]
  let uMeta = _.extend(umeta, params.umeta)
  if (!uMeta.data) {
    uMeta.data = 'data'
  }
  // 适配datasource(checkbox radiobox select)
  if (params.vm && params.vm.datasource) {
    uMeta.datasource = 'datasource'
  }
  dom.setAttribute('u-meta', JSON.stringify(uMeta))
  let vm = {
  }
  // 适配老的api 这里定义成vm更符合语义 modify by songhlc
  if (params.data) {
    vm = _.extend(vm, params.data)
  }
  if (params.vm) {
    vm = _.extend(vm, params.vm)
  }

  window.app.createComp(dom, vm)
}
