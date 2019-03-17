import ko from 'knockout'
import 'ko-bindinghandler'
import comp from '../index.js'
import $ from 'jquery'

function getTarget (node) {
  return document.body
}
// 防止transferdom报错
ko.bindingHandlers.transferdom = {
  init: function (el, value, allBindings, viewModel, bindingContext) {
    el.className = el.className ? el.className + ' v-transfer-dom' : 'v-transfer-dom'
    const parentNode = el.parentNode
    if (!parentNode) return
    const home = document.createComment('')
    let hasMovedOut = false

    if (value() !== false) {
      parentNode.replaceChild(home, el) // moving out, el is no longer in the document
      getTarget().appendChild(el) // moving into new place
      hasMovedOut = true
    }
    if (!el.__transferDomData) {
      el.__transferDomData = {
        parentNode: parentNode,
        home: home,
        target: getTarget(),
        hasMovedOut: hasMovedOut
      }
    }
  },
  update: function (el, value, allBindings, viewModel, bindingContext) {
    // 某些场景可能el不存在
    if (el.dataset && el.dataset.transfer !== 'true') return false
    // need to make sure children are done updating (vs. `update`)
    const ref$1 = el.__transferDomData
    if (!ref$1) return
    // homes.get(el)
    const parentNode = ref$1.parentNode
    const home = ref$1.home
    const hasMovedOut = ref$1.hasMovedOut // recall where home is

    if (!hasMovedOut && value()) {
      // remove from document and leave placeholder
      parentNode.replaceChild(home, el)
      // append to target
      getTarget().appendChild(el)
      el.__transferDomData = Object.assign({}, el.__transferDomData, {
        hasMovedOut: true,
        target: getTarget(value)
      })
    } else if (hasMovedOut && value() === false) {
      // previously moved, coming back home
      parentNode.replaceChild(el, home)
      el.__transferDomData = Object.assign({}, el.__transferDomData, {
        hasMovedOut: false,
        target: getTarget(value)
      })
    } else if (value()) {
      // already moved, going somewhere else
      getTarget().appendChild(el)
    }
  }
}

describe('y-dropdown组件', () => {
  const PREFIX = 'y-'
  ko.components.register(PREFIX + comp.name, {
    viewModel: comp.init,
    template: comp.template,
    synchronous: true
  })
  ko.cleanNode(document.getElementsByTagName('body')[0])
  let vm = {
    title: ko.observable('test'),
    item: {
      value: 1,
      label: '男'
    },
    dataList: ko.observableArray([{
      value: 1,
      label: 'label1'
    }, {
      value: 2,
      label: 'label2'
    }]),
    isShow: ko.observable(true)
  }
  document.body.innerHTML = '<y-dropdown params="width:300, isShow:isShow, isStopTransferDom: true"><div data-bind="foreach:$parent.dataList">' +
    '<div class="mytestClass" data-bind="text:$data.label"></div>'
  '</div></y-dropdown>'
  ko.applyBindings(vm)
  var el = $('body')
  it('组件注册测试', () => {
    expect(comp).not.toBeNull()
    expect(ko.components.isRegistered(PREFIX + comp.name)).toBe(true)
  })
  it('验证width参数', () => {
    expect($('body').find('.y-dropdown').css('width')).toEqual('300px')
  })
  it('测试数据内容多次渲染', () => {
    var el = $('body').find('.mytestClass')
    var value = el.eq(0).text().trim()
    expect(value).toEqual(vm.dataList()[0].label)
    var value2 = el.eq(1).text().trim()
    expect(value2).toEqual(vm.dataList()[1].label)
  })
  it('快照', () => {
    expect($('body').get(0)).toMatchSnapshot()
  })
})
