### ko-epui

#### 工程师正在抓紧编写文档中

### 运行demo

下载本工程

```
npm install

npm run dev

//访问 http://localhost:8084  端口号在package.json进行修改
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
<u-tree class="form-control" params='data:{model:$root.treemodel,treeSetting:$root.treeOption},
  umeta:{"id":"tree","data":"model","idField":"id","pidField":"pid","nameField":"title","setting":"treeSetting"}'>
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
<u-input params='data:{model:$root.model},umeta:{"id":"require","required":"true","type":"string","data":"model","field":"name","nullMsg":"带校验输入框不能为空"}'></u-input>
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

## u-pagination
```
<u-pagination params='vm: {data: $root.paginationmodel, sizeChange: $root.sizeChange, pageChange: $root.pageChange}'>
           </u-pagination>

//分页组件特有事件 sizeChange/pageChange 以下函数自定义用以上方式进行绑定
sizeChange (obj) {
  console.log(obj)
},
pageChange (obj) {
  console.log(obj)
}

