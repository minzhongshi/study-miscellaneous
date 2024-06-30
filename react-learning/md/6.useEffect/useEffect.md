# useEffect 

## 概念

> useEffect 是个React Hook函数，用于在React组件中创建不是由事件引起而是由渲染本身引起的操作，比如发送请求，更改DOM等。

## 基础使用

```javascript
 useEffect(()=> {},[]);
```

- 参数一是一个函数，称为副作用函数，在函数内部可以放置要执行的操作
- 参数二是一个数组（可选参），在数组内放置依赖项，不同依赖项会影响第一个参数函数执行，当空数组时，副作用函数只会在渲染完毕后执行一次

```javascript
function App() {
    const myRef = useRef();
    console.log('1',myRef);
    useEffect(()=> {
        console.log('渲染完毕')
        console.log('2',myRef);
    },[]);
    return (
        <div className="App">
            <div ref={myRef}></div>
        </div>
    );
}
```

## 依赖项参数说明


| 依赖项   | 副作用函数执行时机           |
|-------|---------------------|
| 没有依赖项 | 组件初始渲染 + 组件更新时执行    |
| 空数组依赖 | 只在初始渲染时执行一次         |
| 没有依赖项 | 组件初始渲染 + 特性依赖项变化时执行 |

```javascript
function App() {
    const myRef = useRef();
    const [msg,setMsg] = useState(0);
    const [msg2,setMsg2] = useState(0);

    useEffect(()=> {
        console.log('渲染完毕');
    },[msg,msg2]);
    return (
        <div className="App">
            <button onClick={()=>setMsg2(msg2 + 1)}>{msg2}</button>
        </div>
    );
}
```


## useEffect 清除副作用

> 在useEffect中编写的由渲染本身引起的对接组件外部操作，称为副作用操作，如在useEffect 中开启定时器，在写在组建时将定时器清除掉

```javascript
function App() {
    const [show,setShow] = useState(true);
    function Son() {
        useEffect(()=> {
            console.log('渲染完毕');
            const time = setInterval(()=>{
                console.log('定时器运行');
            },1000)
            return ()=>{
                clearInterval(time);
            }
        },[]);
        return <div>Son</div>
    }

    return (
        <div className="App">
            {show && <Son></Son>}
            <button onClick={()=>setShow(false)}>卸载</button>
        </div>
    );
}
```