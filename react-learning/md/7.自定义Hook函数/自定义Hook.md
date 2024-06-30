# 自定义Hook

## 概念

> 自定义Hook是以use打头的函数，通过自定义Hook函数可以用来实现逻辑的封装和复用

## 基础使用

```javascript
 function useToggle() {
    const [show,setShow] = useState(true);
    const toggle = () => setShow(!show);

    return {
        show,
        toggle
    }
}
function App() {
    const {show, toggle} = useToggle();
    function Son() {
        return <div>Son</div>
    }

    return (
        <div className="App">
            {show && <Son></Son>}
            <button onClick={toggle}>卸载</button>
        </div>
    );
}
```


## 封装Hook基本思路

- 声明一个以use打头的函数
- 在函数体内封装可复用的逻辑
- 把组件中用到的状态或者回调return出去
- 在组件中用到的逻辑，就执行函数结构出来的状态和回调


## React Hook使用规则
- 只能在组件中或者其它自定义Hook函数中调用
- 只能在组件的顶层调用，不能嵌套在if、for、内部函数语句中私用


## 自定义Hook封装数据请求

```javascript
function useGetList() {
    const [dataList , setDataList] = useState([]);

    useEffect(()=>{
        async function getList() {
            return await axios.get('http://localhost:5000/list');
        }
        getList()
            .then(res=>{
                setDataList(res.data);
            })
    },[])

    return {
        dataList,
        setDataList
    }
}
```
