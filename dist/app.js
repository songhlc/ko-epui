var viewModel = {
  stepCurrentId: ko.observable(1),
  stepCurrentIndex:ko.observable(0),
  legend: ko.observableArray(),
  sizechange: function () {
    console.log('hello')
  },
  id: ko.observable(''),
  test: ko.observable('ggg'),
  save: function (msg) {
    let validator = window.app.compsValidateMultiParam({element: window.$('body')[0]})
    if (validator.passed) {
      window.alert('save me')
    } else {
      for (let i = 0; i < validator.notPassedArr.length; i++) {
        validator.notPassedArr[i].comp.doValidate()
      }
    }
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
  paginationmodel: new window.u.DataTable({
    meta: {
      'id': '',
      'name': ''
    }
  }),
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
      name: '',
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
  }),
  sizeChange (obj) {
    console.log(obj)
  },
  pageChange (obj) {
    console.log(obj)
  }
}
setTimeout(function () {
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
    ucurrency: '200.02',
    name: ''
  })
}, 100)
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
let paginationData = [
  {
    id: 1,
    name: '2'
  },{
    id: 1,
    name: '2'
  },{
    id: 1,
    name: '2'
  },{
    id: 1,
    name: '2'
  },{
    id: 1,
    name: '2'
  },{
    id: 1,
    name: '2'
  },{
    id: 1,
    name: '2'
  },{
    id: 1,
    name: '2'
  },{
    id: 1,
    name: '2'
  }
]
// viewModel.paginationmodel.pageIndex(0)
viewModel.paginationmodel.pageSize(10)
viewModel.paginationmodel.totalPages(15)
viewModel.paginationmodel.setSimpleData(paginationData)
window.app = window.u.createApp({
  el: 'body',
  model: viewModel
})
setTimeout(function () {
  viewModel.test("ggg2")
  viewModel.statuItems(
    [
      {
        title: '待收货',
        state: 1,
        num: 1
      },
      {
        title: '已收货',
        state: 2,
        num: 2
      },
      {
        title: '待收货',
        state: 3,
        num: 3
      }
    ]
  )
  viewModel.legend([
    {
      id: 1,
      name: '立项'
    }, {
      id: 2,
      name: '发公告'
    }, {
      id: 3,
      name: '接受报名'
    }, {
      id: 4,
      name: '资格预审'
    }, {
      id: 5,
      name: '发标书'
    }, {
      id: 6,
      name: '接受投标'
    }
  ])
  viewModel.index(2)
  viewModel.stepCurrentIndex(3)
  viewModel.stepCurrentId(4)
}, 1000)
