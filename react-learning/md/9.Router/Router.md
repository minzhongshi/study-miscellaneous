# Router

## 概念

> 



## 基础使用

- 安装

```javascript
  pnpm i react-router-dom
```

- 创建路由实例对象

```javascript
import {createBrowserRouter,RouterProvider} from "react-router-dom";

// 1. 创建router实例对象并且配置路由对应关系

const router = createBrowserRouter([
    {
        path:'/login',
        element: <div>登录页</div>
    },
    {
        path:'/article',
        element: <div>文章页</div>
    }
])

```

- 根组件挂载

```javascript
root.render(
        <RouterProvider router={router}></RouterProvider>
);
```


## 抽象Router模块

- 创建路由组件
 在src目录下创建page目录用来存放组件
- 创建Router模块
  在src目录下创建router目录用来创建router实例
- 注入Router实例
  在入口文件挂载路由

## 路由导航
多个路由之间需要进行跳转，并且跳转时可以携带参数

- 声明式导航
通过`<Link/>`组件描述要跳转的信息，用to属性指定跳转到路由path，组件会被渲染为a链接，传参通过字符串拼接参数即可。
```javascript
 <Link to="/article">跳转</Link>
```
- 编程式导航
通过`useNavigate`钩子得到导航方法，通过调用方法以命令形式进行路由跳转，
```javascript
const Login = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={()=>navigate("/article")}>跳转</button>
        </div>
    )
}
```

- searchParams传参
```javascript
<button onClick={()=>navigate("/article?id=100&name=smz")}>跳转</button>
```

```javascript
 const [params] = useSearchParams();
let id = params.get('id');
let name = params.get('name');
```
- params传参
需要在路由配置中，在目标路由凭借占位符

```javascript
 <button onClick={()=>navigate("/article/1001")}>跳转</button>
```
```javascript
{
    path:'/article/:id',
        element: <Article/>
}
```

```javascript
const params = useParams();
let id = params.id;
```

## 嵌套路由
- 使用 children 属性配置路由嵌套关系
```javascript
 {
    path:'/',
        element: <Login/>,
        children:[
        {
            path:'/login',
            element: <Login/>,
        },
        {
            path:'/article',
            element: <Article/>,
        },
    ]
}
```
- 使用 <Outlet> 组件配置二级路由渲染位置

```javascript
<button onClick={()=>navigate("/login")}>跳转</button>
<button onClick={()=>navigate("/article")}>跳转</button>

<Outlet />
```

- 默认二级路由
去除 path 属性 添加 index 为 true
```javascript
 {
    index:true,
    element: <Article/>,
}
```

## 404 路由配置
- 准备一个404（NotFound）组件

```javascript
const NotFound = () => {
    return (
        <div>
            404 页面
        </div>
    )
}
export default NotFound;
```
- 在路由表数组的末尾，以*号作为路由path配置路由

```javascript
  {
    path: '*',
        element: <NotFound/>
}
```

## 两种路由模式

> ReactRouter 分别由createBrowerRouter 和 createHashRouter 函数负责创建

- history模式
history对象 + pushState事件，需要后端支持，具体为用户直接输入某个页面地址，没匹配到静态资源时会到404页面，但是此时应该将页面重定向到主页
- hash模式
监听hashChange事件，不需要后端支持
