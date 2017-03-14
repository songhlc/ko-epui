/*
* 参考 https://github.com/garand/sticky/blob/master/jquery.sticky.js实现
* */
/* global $ */
var o = {
  currentTop: null,
  topSpacing: 0,
  className: 'is-sticky'
}
function init (params) {
  this.title = params.title
  let stickyElement = $('#box-sticky')
  var stickyWrapper = stickyElement.parent()
  o.stickyElement = stickyElement
  o.stickyWrapper = stickyWrapper
  o = $.extend({}, o, params)
  //
  if (window.addEventListener) {
    window.addEventListener('scroll', scroller, false)
    // TODO 浏览器窗口resize的时候也需要重新计算
    // window.addEventListener('resize', resizer, false)
  } else if (window.attachEvent) {
    window.attachEvent('onscroll', scroller)
    // window.attachEvent('onresize', resizer)
  }
  setTimeout(scroller, 0)
  stickyElement.delegate('.sticky-anchor', 'click', function () {
    if (window.location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && window.location.hostname === this.hostname) {
      var target = $(this.hash)
      $('.sticky-anchor').removeClass('active')
      $(this).addClass('active')
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 40
        }, 1000)
        return false
      }
    }
  })
}
var anchor = null
var anchorlist = []
function scroller () {
  // 如果不存在元素
  if (!anchor) {
    anchor = $('.sticky-anchor')
    anchor.each(function () {
      anchorlist.push($(this).attr('href'))
    })
  }
  anchorlist.forEach(function (item) {
    let pos = $(item).offset().top - $('body').scrollTop()
    // 确保滚轮滚动时 会定位到相应的选项
    if (pos - document.body.clientHeight / 2 < 50) {
      if (!($('.sticky-anchor[href="' + item + '"]').hasClass('active'))) {
        $('.sticky-anchor').removeClass('active')
        $('.sticky-anchor[href="' + item + '"]').addClass('active')
      }
    }
  })
  // update height in case of dynamic content
  o.stickyWrapper.css('height', o.stickyElement.outerHeight())
  let scrollTop = $(window).scrollTop()
  let documentHeight = $(document).height()
  let windowHeight = $(window).height()
  let dwh = documentHeight - windowHeight
  let extra = (scrollTop > dwh) ? dwh - scrollTop : 0

  let elementTop = o.stickyWrapper.offset().top
  let etse = elementTop - o.topSpacing - extra

  o.stickyWrapper.css('height', o.stickyElement.outerHeight())
  if (scrollTop <= etse) {
    if (o.currentTop !== null) {
      o.stickyElement
        .css({
          'width': '',
          'position': '',
          'top': '',
          'z-index': ''
        })
      o.stickyElement.parent().removeClass(o.className)
      o.currentTop = null
    }
  } else {
    var newTop = documentHeight - o.stickyElement.outerHeight() - o.topSpacing - o.bottomSpacing - scrollTop - extra
    if (newTop < 0) {
      newTop = newTop + o.topSpacing
    } else {
      newTop = o.topSpacing
    }
    if (o.currentTop !== newTop) {
      var newWidth
      if (newWidth == null) {
        newWidth = o.stickyElement.outerWidth()
      }
      o.stickyElement
        .css('width', newWidth)
        .css('position', 'fixed')
        .css('top', newTop)
        .css('z-index', o.zIndex)

      o.stickyElement.parent().addClass(o.className)
      o.currentTop = newTop
    }

    // Check if sticky has reached end of container and stop sticking
    var stickyWrapperContainer = o.stickyWrapper.parent()
    var unstick = (o.stickyElement.offset().top + o.stickyElement.outerHeight() >= stickyWrapperContainer.offset().top + stickyWrapperContainer.outerHeight()) && (o.stickyElement.offset().top <= o.topSpacing)

    if (unstick) {
      o.stickyElement
        .css('position', 'absolute')
        .css('top', '')
        .css('bottom', 0)
        .css('z-index', '')
    } else {
      o.stickyElement
        .css('position', 'fixed')
        .css('top', newTop)
        .css('bottom', '')
        .css('z-index', o.zIndex)
    }
  }
}
export default init
