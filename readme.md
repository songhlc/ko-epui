[![npm version](https://img.shields.io/npm/v/ko-epui.svg)](https://www.npmjs.com/package/ko-epui)
[![license](https://img.shields.io/npm/l/ko-epui.svg)](https://www.npmjs.com/package/ko-epui)
[![Build Status](https://api.travis-ci.org/songhlc/ko-epui.png?branch=master)](https://api.travis-ci.org/songhlc/ko-epui.png?branch=master)
# ko-epui
- 基于knockoutjs 和 [kero](http://tinper.org/dist/kero/index.html) 封装的UI组件

## 目录

- 1.介绍
- 2.安装
- 3.使用
- 4.组件列表
- 5.多页面应用脚手架
- 6.更新日志
- 7. [Document](https://github.com/songhlc/ko-epui/blob/master/document.md)


## 1.介绍

ko-epui(knockout/kero base enterprise ui component) 基于knockout组件 和 [kero](http://tinper.org/dist/kero/index.html)封装的ui组件。依赖于knockout 和kero
- 我们的目标:不写css
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
//新的方式1 推荐使用：
<u-radio params='vm:{data:$root.radiodata},umeta:{"id":"r1","field":"openTenderType"}'>
</u-radio>
//方式2 兼容1.3.x版本ko-epui：
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
yarn install ko-epui
```

查看项目示例,下载本工程后运行
```
yarn install
npm run dev
```
访问http://localhost:8084即可

### 3.如何使用

```
import 'ko-epui/dist/ko-epui.css'

import ko from 'ko-epui'

or

import from 'ko-epui'


```
组件中默认会注册window.ko = ko

#### 3.1 html
```
<box>
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
            <u-datepicker params='vm:{data:$root.model,datasource: $root.comboData},umeta:{"id":"udatetime222","field":"createTime","startField":"exceptStartTime"}'></u-datepicker>
          </div>
        </div>
        <div class="u-form-group">
          <label class="u-col-2 text-right u-form-label">下拉框:</label>
          <div class="u-col-3">
            <u-select params='vm:{data:$root.model,datasource: $root.comboData},umeta:{"field":"purchaseType"}'>
            </u-select>
          </div>
        </div>
        <div class="u-form-group">
          <label class="u-col-2 text-right u-form-label">switch:</label>
          <div class="u-col-3">
            <u-switch params='vm:{data:$root.model},umeta:{"data":"model","field":"isCtrlOpen"}'>
            </u-switch>
          </div>
        </div>
      </div>
    </box-content>
  </box>

```
#### 3.2 js
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
- u-year
- u-month
- u-currency
- u-tree
- pagination
- sticky-box 吸顶菜单
- form-group, form-title, form-ctn, form-text
- datepicker,datetimepicker

计划完成组件
- message组件
- tipdialog组件
- advanceSearch 高级查询组件
- u-grid (会进行结合datatable的深度封装，不推荐一般用户使用)
- u-time /*新增更好的time实现*/
- u-input
- validate-input
- fileupload
- 增加自定义指令的支持

### 5.多页面应用脚手架

敬请期待

### 6.更新日志
- 2015-05-24 v2.1.2 修改submit组件，添加更好的防重复提价机制
- 2017-05-09 v2.1.0 增加datepicker 和datetimepicker组件
- 2017-04-10 v2.0.8 u-datepicker增加placeholder,u-select和u-datepicker增加自定义样式iconCls
- 2017-04-07 v2.0.7 u-select 组件增加placeholder参数 see document
- 2017-03-17 v2.0.6 增加submit按钮组件,支持防止连续点击重复提交
- 2017-03-13 v2.0.2 调整组件结构,增加自定义指令的支持,增加form组价的支持,添加inline-checkbox 支持checkbox值在同一行显示
- 2017-03-10 v1.5.1 新增box-sticky 吸顶菜单组件
- 2017-02-27 v1.4.3 新增pagination组件
- 2017-02-16 v1.4.2 修复radio bug
- 2017-02-09 v1.3.3 新增u-tree组件
- 2017-01-08 v1.2.3 适配kero 3.1.19, state-tabs取代query-tabs
- 2017-01-07 添加u-year,u-month,u-yearmonth,u-currency组件
- 2016-12-24 添加query-tabs组件,状态tab选项卡(通常配合grid使用)
