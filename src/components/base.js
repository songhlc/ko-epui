import _ from 'lodash'
export function CreatApp (componentInfo, umeta, params) {
  let dom = componentInfo.element.children[0]
  let uMeta = _.extend(umeta, params.umeta)
  if (!uMeta.data) {
    uMeta.data = 'data'
  }
  // 对于输入框统一添加placeholder
  if (params.vm) {
    if (params.vm.placeholder) {
      let element = dom.getElementsByTagName('input')[0]
      element.attributes.placeholder.nodeValue = params.vm.placeholder
    }
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
export function CustomIconCls (params, componentInfo, customTag) {
  // 添加自定义样式支持
  if (params.vm) {
    if (params.vm.iconCls) {
      let dom = componentInfo.element.children[0]
      let element = dom.getElementsByTagName(customTag)[0]
      let nodeCls = params.vm.iconCls.indexOf('uf') >= 0 ? (params.vm.iconCls + ' u-form-control-feedback') : params.vm.iconCls
      element.attributes.class.nodeValue = nodeCls
    }
  }
}
