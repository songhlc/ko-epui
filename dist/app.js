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
window.app = window.u.createApp({
  el: 'body',
  model: viewModel
})
