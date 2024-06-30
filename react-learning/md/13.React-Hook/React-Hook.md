# React-Hook

## useReducer
> 与useState作用类似，用来管理相对复杂的状态数据,是uasState的替代,负责更复杂的状态管理。

- 用法：

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

第一个参数 reducer 是函数 (state, action) => newState，接受当前的 state 和操作行为。
第二个参数 initialArg 是状态初始值。
第三个参数 init 是懒惰初始化函数。

state：状态
dispatch：使用方法触发`reducer`，并将`dispatch`中的参数赋值给 `action`。

`action 可以是任意类型，不过通常至少是一个存在 type 属性的对象。也就是说它需要携带计算新的 state 值所必须的数据。`

```js
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

## useMemo

- 作用
在组件每次重新渲染的时候缓存计算的结果

- 说明
当使用useMemo做缓存后，可以保证只有对应依赖发生变化时才重新计算

- 语法

其中第二参数决定了什么时间决定执行第一个参数的函数

```js
  const result = useMemo(()=>{
    // 返回计算结果
    return fib(count1)
},[count1]);
```

## useCallback

- 作用
> 在组件多次渲染的之后缓存函数

- 语法
将传递 函数逻辑用 `useCallback` 包裹 函数为第一个参数，第二个参数为依赖项，通常传入空数组,表示缓存一次

```js
const changeHandler = useCallback((value) => console.log(value),[]);
```

- 使用useCallback包裹函数之后，函数可以保证在APP重新渲染的时候保持引用稳定。


```js
import {memo, useCallback, useMemo, useState} from "react";
const Input = memo(
    function Input({onChange}) {
      console.log('子组件重新渲染');
      return <input type="text" onChange={(e)=> onChange(e.target.value)}/>
    }
)

function App() {
    // 传递给子组件的函数
const changeHandler = useCallback((value) => console.log(value),[]);

  // 触发父组件重新渲染函数
  const[count,setCount] = useState(0)
  return (
    <div className="App">
        {/*函数作为prop传递*/}
        <Input onChange={changeHandler} />
      <button onClick={()=> setCount(count +1)}>+{count}</button>
    </div>
  );
}
```

## useImperativeHandle

- 作用
> 暴露子组件中的方法

- 语法
```js

const Input = forwardRef((props,ref)=>{
    const inputRef = useRef(null);
    //实现聚焦逻辑
    const focusHandler = () => {
        inputRef.current.focus();
    }
    //暴露函数
    useImperativeHandle(ref, ()=> {
        return {
            focusHandler
        }
    })
    return <input type="text" ref={inputRef}/>
})

function App() {
    const inputRef= useRef(null);
    const onchange = () =>{
        console.log(inputRef)
        // 直接调用方法
        inputRef.current.focusHandler();
    }
    return (
        <div className="App">
            <Input ref={inputRef} />
            <button onClick={onchange}>focus</button>
        </div>
    );
}
```




 