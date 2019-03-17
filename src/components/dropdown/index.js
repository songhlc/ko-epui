import template from './index.html'
var ko = window.ko
var $ = window.$
import 'ko-bindinghandler'

function _init (params, el) {
  this.isShow = params.isShow || ko.observable(false)
  this.scrollTop = params.scrollTop || ko.observable()
  let _el = el.element
  this.scrollTop.subscribe(val => {
    _el.children[0].scrollTop = val
  })
  this.dropStyle = params.style
  this.$el = el
  this.isTransferDom = !params.isStopTransferDom
  this.targetEl = params.targetEl
  this.top = ko.observable()
  this.left = ko.observable()
  this.topAdjust = params.topAdjust || 0
  this.width = ko.observable(params.width || '100%')
  var scrollEvent = function () {
    if (this.isShow()) {
      this.top(this.targetEl.children[0].getBoundingClientRect().top + 32)
    }
  }.bind(this)
  this.onEnter = () => {

  }
  this.onLeave = () => {

  }
  // 切换时重新设置下拉的未知
  this.isShow.subscribe(val => {
    // 多选情况比较复杂，暂不支持穿越overflowhidden
    if (val && this.isTransferDom) {
      let el = this.targetEl.children[0]
      let position = el.getBoundingClientRect()
      var left = position.left
      var right = position.right
      var dropWidth = this.width() === '100%' ? el.offsetWidth : (this.width().toString().replace('px', '') - 0)
      // 如果距离右侧屏幕宽度小于250
      if (document.documentElement.clientWidth - position.left < dropWidth) {
        left = right - dropWidth
      }
      if (!params.width) {
        this.width($(el).width())
      }
      this.left(left)
      // select 默认高度 + 32
      this.top(position.top + 32)
      document.addEventListener('scroll', scrollEvent)
    } else {
      document.removeEventListener('scroll', scrollEvent)
    }
  })
  this.style = ko.computed(() => {
    let style = params.style || {}
    // width 支持ko和非ko对象
    if (this.width && this.width.subscribe) {
      // 存在传入 100%的情况
      if (isNaN(this.width())) {
        style.width = this.width()
      } else {
        style.width = this.width() + 'px'
      }
    }
    if (params.maxHeight) {
      style.maxHeight = params.maxHeight + 'px'
    }
    if (params.overflow) {
      style.overflow = params.overflow
    }
    if (this.top()) {
      style.top = this.top() + Number(this.topAdjust) + 'px'
      style.left = this.left() + 'px'
      style.position = 'fixed'
    } else {
      style.position = 'absolute'
    }

    return style
  })
  this.animated = ko.observable(false)
  this.isShow.subscribe(val => {
    this.animated(true)
    setTimeout(() => {
      this.animated(false)
    }, 1500)
  })
}
var init = {
  createViewModel: function (params, componentInfo) {
    return new _init(params, componentInfo)
  }
}
export default {
  name: 'dropdown',
  init,
  template
}
