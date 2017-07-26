### ko-epui

#### 工程师正在抓紧编写文档中

### 运行demo

下载本工程

```
npm install

npm run dev

//访问 http://localhost:8084
```

# 目录
- 容器组件
--
- kero组件

# 1.容器组件

## 1.1 box
页面外层容器会默认添加一些padding和margin
``` css
  .box{
    margin: 0 15px 25px 15px;
    padding: 12px 10px 20px;
  }
```

``` html
<box>
  <div>里面是正常的嵌套</div>
  <input type=text/>
</box>
```

## 1.2 box-content
内容区域
```

```


# 2.控件
## 2.1 u-input 普通输入框组件
```
<u-input params='vm:{data:$root.model},umeta:{"id":"require","required":"true","type":"string","field":"name","nullMsg":"带校验输入框不能为空"}'></u-input>
//type可以是string integer float等等 可以参考 [kero校验规则设置](http://tinper.org/dist/kero/docs/validateapi.html)

//保存方法前进行校验
save: function (msg) {
    let validator = window.app.compsValidateMultiParam({element: window.$('body')[0]})
    if (validator.passed) {
      window.alert('save me')
    } else {
      for (let i = 0; i < validator.notPassedArr.length; i++) {
        validator.notPassedArr[i].comp.doValidate()
      }
    }
  }

```
## 2.2 box-sticky 吸顶菜单组件
```
<box-sticky params="title:'吸顶菜单'">
    <div class="u-col-8 text-center">
      <a href="#a1" class="sticky-anchor active">表单显示</a>
      <a href="#a2" class="sticky-anchor">使用说明</a>
    </div>
    <div class="u-col-2">
      <button class="pull-right">btn</button>
    </div>
</box-sticky>
```

## 2.3 u-pagination 分页组件
```
//数据,事件使用params选项进行绑定,属性使用umeta进行绑定
<u-pagination params='vm: {data: $root.paginationmodel, sizeChange: $root.sizeChange, pageChange: $root.pageChange}'>
           </u-pagination>

//分页组件特有事件 sizeChange/pageChange 以下函数自定义用以上方式进行绑定
sizeChange (obj) {
  console.log(obj)
},
pageChange (obj) {
  console.log(obj)
}
```
## 2.4 u-tree
需要依赖uui下的css/tree.min.css 和 js/u-tree.min.js
```
<u-tree class="form-control" params='vm:{data:$root.treemodel,setting:$root.treeOption},
  umeta:{"id":"tree","idField":"id","pidField":"pid","nameField":"title"}'>
</u-tree>
viewmodel:{
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
  }
}
```
## 2.5 u-select

普通下拉框组件,依赖uui的select
```
<u-select params='vm:
    {
      placeholder: "please select me", //placeholder
      data:$root.model,  //数据源
      datasource: $root.comboData  //下拉列表,
      iconCls: 'uf uf-icon' //自定义样式
    },
    umeta:{"field":"test"}'>
</u-select>
```
## 2.6 u-datepicker

日期组件,依赖uui的datepicker
```
<u-datepicker params='
  vm:{
    iconCls:"uf uf-triangle-down",
    placeholder:"请选择日期",
    data:$root.model
  },
  umeta:{"id":"udatetime223","field":"exceptEndTime","startField":"exceptStartTime"}'></u-datepicker>
```

## 2.7 datepicker,datetimepicker组件
日期组件,不依赖uui
```
<datepicker params="placeholder:'请选择日期!',data: $root.model.ref('exceptStartTime')"></datepicker>
<datetimepicker params="placeholder:'请选择日期!',data: $root.model.ref('createTime')"></datetimepicker>
```

# 3.表单组件

```
/*
* 表单组件通用样式,用于做自适应布局
* params:{
*   md: 4   // form-group一共占据几列 默认按照栅格化布局来 相当于设置样式u-col-4 不设置和md的效果一样
*   sm: 3   // 相当于样式u-col-sm-3
*   xs: 12  // 相当于设置u-col-xs-12
*   lg: 6  //相当于设置u-col-lg-6
* }
*
* */

```

## 3.1 form-group 表单组根容器
```
 <form-group params="md:10">
 </form-group>
```

## 3.2 form-title 字段名称
```
<form-group params="md:10">
  <form-title params="md:2,sm:4,xs:6">姓名</form-title>
 </form-group>

//动态数据
<form-group params="md:10">
  <form-title params="text:$root.model.ref('name'),md:2,sm:4,xs:6"></form-title>
 </form-group>
```

## 3.3 form-text 字段值 通常在详细页面配合form-title使用
```
<form-group params="md:10">
  <form-title params="md:2,sm:4,xs:6">姓名</form-title>
  <form-text params="text:$root.model.ref('name'),md:2,sm:4,xs:6"></form-text>
 </form-group>
```

## 3.4 form-ctn 通常配合其他输入控件以及form-title使用
```
<form-group params="md:10">
  <form-title params="md:2,sm:4,xs:6">姓名</form-title>
  <form-ctn params="md:2,sm:4,xs:6">
    <input data-bind="value:$root.model.ref('customvalue')"/>
  </form-ctn>
</form-group>

```
## 3.5 submit组件 提供防止多次重复点击的问题 默认debouce 400ms
```
/*
* params:{
     click: ** //click function
     text: ** //button text
     debounce: 300 // default 300ms
     maxWait: 1000 // default 1000ms
  }
  //实际使用lodash.debounce
*
*/
<submit params="click:$root.forbitRepeatClick,text:'防止重复提交'"></submit>
```

## 3.6 step-legend 组件
```
<step-legend params="list: legend,currentIndex: stepCurrentIndex">

</step-legend>
  
  or 
  
<step-legend params="list: legend,currentId: stepCurrentId">
  
</step-legend>
```

## 3.7 cascader 级联组件(暂不知此异步加载)
```
<cascader params='data:cascaderData, selectedValue: cascaderValue'>
          </cascader>
          
cascaderData: ko.observableArray([
    {
      id: 1,
      name: '1',
    }, {
      id: 2,
      name: '有下级',
      children: [
        {
          id:3,
          name: '4',
        }, {
          id:4,
          name: '有下级',
          children: [
            {
              id:5,
              name: '4',
            }, {
              id:6,
              name: '有下级',
              children: [
                {
                  id:7,
                  name: '4',
                }, {
                  name: '有下级',
                }
              ]
            }
          ]
        }
      ]
    }, {
      id:8,
      name: '3',
    }
  ]),
  cascaderValue: ko.observable({name: '', id: ''}),          
          
```

# 4 自定义指令

## 4.1 hideInNewWindow

使用场景：使用window.open或者 
`<a target='_blank'></a>` 弹出的新窗口

针对这些页面有些按钮需要隐藏（如：返回按钮（因为可能使用history.go(-1)来做返回操作））

如何使用：
```
<div data-bind='hideInNewWindow,click:"xxx这里是原来的click事件"'></div>

```

## 4.2 repeatClick

防止重复点击多次提交而设置的一个按钮，使用repeatClick代替click指令

如何使用

```
<div data-bind='repeatClick:"xxx这里是原来的click事件"'></div>

```

## 4.3


## 4.2 repeatSubmit

防止重复点击多次提交而设置的一个按钮，使用repeatSubmit代替submit指令

如何使用

```
<form data-bind='repeatSubmit:"xxx这里是原来的submit事件"'></form>

