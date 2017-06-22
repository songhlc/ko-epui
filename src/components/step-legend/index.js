/*
*title: step legend组件
*author: songhlc
*description: 用于显示业务流程当前所处的节点和状态（默认只支持线性流程，一条直线，不支持过多分支类流程）
* params: {
*   //初始化数据
*   list: [{
*     id: '',
*     name: ''
*   }],
*   currentId: '', //二选一
*   currentIndex: '' //二选一
* }
*
* */

function init ({list, currentId, currentIndex, type = 'md'}) {
  this.list = list
  this.currentId = currentId
  this.type = type

  if (currentIndex && currentIndex.subscribe) {
    this.currentIndex = currentIndex
  } else {
    this.currentIndex = window.ko.observable(currentIndex || 0)
  }
  if (this.currentId && this.currentId.subscribe) {
    // 支持currentId 设置currentIndex
    this.currentId.subscribe(value => {
      let index = this.list().filter((item, index) => {
        return currentId() === item.id
      })
      this.currentIndex(index[0].id)
    })
  }
}
export default init
