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

## 1.3 u-tree
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

## u-input
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
## box-sticky
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
