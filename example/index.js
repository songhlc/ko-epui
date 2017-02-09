import 'src/index.less'
import 'src/index'
/* global ko */
var viewModel = {
  id: ko.observable(''),
  save: function (msg) {
    window.alert('save me')
  },
  statuItems: ko.observableArray([
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
  index: ko.observable(0),
  statusChange (status) {
    console.log(status)
  },
  // 树形模型
  treemodel: new window.u.DataTable({
    meta: {
      'id': {
        'value': ''
      },
      'pid': {
        'value': ''
      },
      'title': {
        'value': ''
      }
    }
  }),
  treeOption: {
    callback: {
      beforeClick: function (treeId, treeNode, clickFlag) {
        console.log('before click')
        console.log(treeId)
        console.log(treeNode)
        console.log(clickFlag)
      },
      onClick: function (event, treeId, treeNode, clickFlag) {
        console.log('on click')
        console.log(event)
        console.log(treeId)
        console.log(treeNode)
        console.log(clickFlag)
      }
    }
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
      enterpriseName: '',
      createField: '',
      uyear: '',
      switch: '',
      checkbox: '',
      exceptStartTime: {type: 'datetime'},
      createTime: {type: 'datetime'},
      purchaseType: '',
      radio: {type: 'Boolean'},
      umonth: '',
      uyearmonth: '',
      ucurrency: {curSymbol: '￥'}
    }
  })
}
viewModel.model.setSimpleData({
  enterpriseName: '公司名称1',
  createField: 'test1',
  uyear: 2016,
  umonth: 12,
  switch: 1,
  checkbox: '1',
  exceptStartTime: '2015-02-02',
  createTime: '2016-02-02',
  purchaseType: '2',
  radio: '2',
  uyearmonth: '2016-12',
  ucurrency: '200.02'
})
var treedata = [{
  'id': '01',
  'pid': 'root',
  'title': 'f1'
}, {
  'id': '02',
  'pid': 'root',
  'title': 'f2'
}, {
  'id': '101',
  'pid': '01',
  'title': 'f11'
}, {
  'id': '102',
  'pid': '01',
  'title': 'f12'
}, {
  'id': '201',
  'pid': '02',
  'title': 'f21'
}]
viewModel.treemodel.removeAllRows()
viewModel.treemodel.setSimpleData(treedata)

window.app = window.u.createApp({
  el: 'body',
  model: viewModel
})
