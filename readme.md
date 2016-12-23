### how 2 use

```
import 'ko-epui/dist/ko-epui.css'
import 'ko-epui'

```

### use in html file
```
<box>
    <breadcrumb></breadcrumb>
    <box-filter params="title:'${__('edit_title')}'">
      <div class="pull-right">
        <button class="btn btn-primary btn-sm  m-r-sm" data-bind="click:$root.save2"><span class="fa fa-save"></span>&nbsp;保存</button>
        <a href="../list/index.${__('locale')}.html" class="btn btn-outline btn-sm m-r-sm"><span class="fa fa-reply"></span>&nbsp;返回</a>
      </div>
    </box-filter>
    <box-content params="title: $root.title">
      <div class="u-row">
        <div class="u-form-group">
          <label class="u-col-2 u-form-group-sm u-form-label text-right">
            ${__('title')}
          </label>
          <div class="u-col-3">
            <input type="text" class="u-form-control" data-bind="value:$root.model.ref('defProjectPsnName')" placeholder="input me">
          </div>
          <label class="u-col-2 u-form-group-sm u-form-label text-right">
            ${__('title')}
          </label>
          <div class="u-col-3">
            <input type="text" class="u-form-control" placeholder="input me" data-bind="value: $root.model.ref('defProjectPsnTel')">
          </div>
        </div>
        <div class="u-form-group">
          <label class="u-col-2 u-form-group-sm u-form-label text-right">
            ${__('title')}
          </label>
          <div class="u-col-3">
            <input type="text" class="u-form-control" placeholder="input me">
          </div>
          <label class="u-col-2 u-form-group-sm u-form-label text-right">
            ${__('title')}
          </label>
          <div class="u-col-3">
            <input type="text" class="u-form-control" placeholder="input me">
          </div>
        </div>
      </div>
    </box-content>
    <box-content params="title: '表格显示'">
      <u-grid params="config: $root.detail_grid"></u-grid>
    </box-content>
    <box-content params="title: $root.thirdtitle, model: $root.model">
      <div class="u-row">
        <div class="u-form-group">
          <label class="u-col-2 text-right u-form-label">日期选择:</label>
          <div class="u-col-3">
            <u-datepicker params='data:{model:$root.model,comboData: $root.comboData},umeta:{"id":"udatetime222","data":"model","field":"createTime","startField":"exceptStartTime"}'></u-datepicker>
          </div>
        </div>
        <div class="u-form-group">
          <label class="u-col-2 text-right u-form-label">下拉框:</label>
          <div class="u-col-3">
            <u-select params='data:{model:$root.model,comboData: $root.comboData},umeta:{"data":"model","field":"purchaseType","datasource":"comboData"}'>
            </u-select>
          </div>
        </div>
        <div class="u-form-group">
          <label class="u-col-2 text-right u-form-label">switch:</label>
          <div class="u-col-3">
            <u-switch params='data:{model:$root.model},umeta:{"data":"model","field":"isCtrlOpen"}'>
            </u-switch>
          </div>
        </div>
        <div class="u-form-group">
          <label class="u-col-2 text-right u-form-label">checkbox:</label>
          <div class="u-col-3">
            <u-checkbox params='data:{model:$root.model,checkboxData:$root.checkboxData},umeta:{"id":"c1","data":"model","field":"isCtrlOpen","datasource":"checkboxData"}'>
            </u-checkbox>
          </div>
        </div>
        <div class="u-form-group">
          <label class="u-col-2 text-right u-form-label">radio:</label>
          <div class="u-col-3">
            <u-radio params='data:{model:$root.model,radiodata:$root.radiodata},umeta:{"id":"r1","data":"model","field":"openTenderType","datasource":"radiodata"}'>
            </u-radio>
          </div>
        </div>
        <div class="u-form-group">
          <label class="u-col-2 text-right u-form-label">textarea:</label>
          <div class="u-col-3">
            <textarea class="u-form-control" data-bind="value:$root.model.ref('enterpriseName')"></textarea>
          </div>
          </div>
        </div>
        <div>
          获取值:app.getComp("id")----id 是对应组件初始化的id <br>

          实际编辑态值会自动保存到model对应字段:参考app.dataTables.model.getCurrentRow().getValue("openTenderType")
        </div>
      </div>
    </box-content>
  </box>

```

```
var viewModel = {
  id: ko.observable(''),
  title: ko.observable('供应商标题'),
  thirdtitle: ko.observable(__('title')),
  ck1: ko.observable(''),
  ck2: ko.observable(''),
  save2: _.partial(window.global.btnClickMask, async function () {
    var data = await projectdef.save()
    if (data.status) {
      EventBus.emit('success', data.msg || '保存成功')
    } else {
      EventBus.emit('fail', data.msg || '保存失败')
    }
  }),
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
  model: projectdef.datatable,
  //
  detail_grid: {
    'id': 'detail_grid',
    'data': projectdef.associations.detailList,
    'type': 'grid',
    'multiSelect': false,
    'editable': true,
    canDrag: false,
    canSwap: false,
    columnMenu: false,
    autoWidth: true,
    fields: [
      {'field': 'materialClassName', 'dataType': 'String', 'title': '物料分类', 'editType': 'addDetail', 'width': '125'},
      {'field': 'materialName', 'dataType': 'String', 'title': '物料信息', 'editType': 'addDetail', 'renderType': 'timeRender', 'sortable': true, 'width': '125'},
      {'field': 'num', 'dataType': 'String', 'title': '数量', 'editType': 'float', 'editOptions': {'validType': 'float', 'precision': '8'}, 'sumCol': true, 'width': '125'},
      {'field': 'unit', 'dataType': 'String', 'title': '单位', 'editType': 'addDetail', 'width': '125'},
      {'field': 'reqDesc', 'dataType': 'String', 'title': '需求描述', 'editType': 'string', 'sumCol': true, 'width': '125'}
    ]
  }
}

window.app = window.u.createApp({
  el: 'body',
  model: viewModel
})
```
