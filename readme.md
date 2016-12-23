[![npm version](https://img.shields.io/npm/v/ko-epui.svg)](https://www.npmjs.com/package/ko-epui)
# ko-epui
- 基于knockoutjs 和 [kero](http://tinper.org/dist/kero/index.html) 封装的UI组件

## 目录

- 1.介绍
- 2.安装
- 3.使用
- 4.组件列表
- 5.多页面应用脚手架


## 1.介绍

ko-epui(knockout/kero base enterprise ui component) 基于knockout组件 和 [kero](http://tinper.org/dist/kero/index.html)封装的ui组件。依赖于knockout 和kero

- 更优雅的自定义标签写法,更好的语义化
```
date日期组件
<u-datepicker params='...'>
</u-datepicker>
```
- 无缝集成kero u-meta api，简化多余重复dom
```
//老的方式：
<div u-meta='{"id":"r1","type":"u-radio","data":"dt1","field":"f1","datasource":"radiodata","hasOther":true}'>
    <label  class="u-radio" >
        <input type="radio" class="u-radio-button" name="options">
        <span class="u-radio-label"></span>
    </label>
</div>

//新的方式：
<u-radio params='data:{model:$root.model,radiodata:$root.radiodata},umeta:{"id":"r1","data":"model","field":"openTenderType","datasource":"radiodata"}'>
</u-radio>
```

- 新增各类box容器组件
```
<box>
  <box-filter></box-filter>
  <box-tabs></box-tabs>
  <box-content></box-content>
</box>
```

- 更好的UI设计,用友网络互联网研发中心UE出品
[demo](https://www.yonyouyc.com/)

- 用友网络友云采产品部最佳实践出品

## 2.安装
```
npm install ko-epui
```

### 3.如何使用

```
import 'ko-epui/dist/ko-epui.css'
import 'ko-epui'

```

#### 3.1 html file
```
<box》
    <box-content params="title: $root.title">
      title
    </box-content>
    <box-content params="title: '表格显示'">
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
  model: projectdef.datatable
}

window.app = window.u.createApp({
  el: 'body',
  model: viewModel
})
```
### 4.组件列表
已完成组件

- u-select
- u-checkbox
- u-datepicker
- u-radio
- u-switch
- box
- box-fliter
- box-content
- box-tabs

计划完成组件
- u-grid (会进行结合datatabl的深度封装，不推荐一般用户使用)
- u-year
- u-month
- u-time
- pagination
- validate-input
- tree
- fileupload
