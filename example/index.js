import 'src/index.less'
import ko from 'src/index'

var viewModel = {
  id: ko.observable(''),
  save: function (msg) {
    window.alert('save me')
  },
  statuItems: ko.observable([
    {
      title: '待收货',
      state: 1,
      num: 0
    },
    {
      title: '已收货',
      state: 2,
      num: 0
    },
    {
      title: '待收货',
      state: 3,
      num: 0
    }
  ]),
  index: 0,
  statusChange (status) {
    console.log(status)
  },
  comboData: [
    {
      name: '公开招标',
      value: 1
    },
    {
      name: '邀请招标',
      value: 2
    },
    {
      name: '单一来源',
      value: 3
    }
  ],
  checkboxData: [{value: '1', name: '产品一'}, {value: '2', name: '产品二'}],
  radiodata: [
    {value: '1', name: '男'}, {value: '2', name: '女'}
  ],
  model: new window.u.DataTable({
    meta: {
      enterpriseName: '公司名称',
      createField: 'test'
    }
  })
}
window.app = window.u.createApp({
  el: 'body',
  model: viewModel
})
