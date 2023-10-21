## 埋点SDK
这是一个用来埋点的SDK，采用TS编写


## 安装
```
npm install smz-tracker
```

## 使用
```
import Tracker from 'smz-tracker'
const tracker = new Tracker({
  requestUrl: '上报地址',
  ...
})
```

可传递参数:
- requestUrl: 接口地址 (必填) String
- historyTracker: history方式路由 (选填) Boolean
- hashTracker: hash方式路由 (选填) Boolean
- domTracker:  Dom事件上报(选填) Boolean ===>标签带有Tracker-key属性才会被上报
- sdkVersion: 版本 (选填) String | Number
- extra: 透传字段 (选填) Object 可以利用setExtra()方法设置
- jsError: js和promise报错异常上报(选填) Boolean

## 开放方法
- setExtra: 设置透传字段
```
tracker.setExtra({
  name: '张三',
  age: 18
})
```
- setUserId: 设置用户id
```
tracker.setUserId('id')
```
- sendTracker: 手动上报
```
  tra.sendTracker({
        type: 'page',
        page: 'index',
        title: '首页',
        url: 'http://localhost:9000/index.html',
        referrer: 'http://localhost:9000/index.html',
        screen: {
            width: window.screen.width,
            height: window.screen.height,
        },
        browser: {
            name: 'chrome',
            version: '1.0.0',
        },
        os: {
            name: 'windows',
            version: '1.0.0',
        },
        network: {
            type: 'wifi',
            effectiveType: '4g',
        }
    })
```

## 其它

- 上报时间已经自动上报，无需添加
- 默认布尔值都为false，需要开启的话，传true即可
- event属性 DOM和路由跳转对应的触发事件，如：click事件，对应的event为click，JS为error，Promise为unhandledrejection
  >DOM事件有：'click', 'dblclick', 'contextmenu', 'mousedown', 'mouseup', 'mouseenter', 'mouseout', 'mouseover'

  > 路由事件有：'hashchange', 'popstate'，'pushState', 'replaceState'
     
- targetKey属性 在DOM上报时是Tracker-key属性值，页面路由是不同路由的标识，如："targetKey":"history-pv" 或者 "targetKey":"hash-pv"
 JS和Promise错误是`message`
- message属性 JS和Promise的错误日志