# React-API

## React.memo

- 作用
> 允许组件在Props没有改变的情况下跳过渲染 

React组件默认渲染机制：只要父组件重新渲染子组件就会重新渲染

- 语法

直接将组件包裹在memo函数中，生成新组件
```js
const MemoSon = memo(
    function Son() {
        console.log('子组件重新渲染');
        return <div>Son</div>
    }
)
```

- 说明
> 在金国Memo函数包裹生成的缓存组件只有在props发生改变的时候才会重新渲染（context未考虑）

- props比较机制
> 在使用memo缓存组件后，React会对每一个`prop`使用`Object.is`，比较新值和老值，返回true，表示没有变化

Object.is :
- 都是 undefined
- 都是 null
- 都是 true 或者都是 false
- 都是长度相同、字符相同、顺序相同的字符串
- 都是相同的对象（意味着两个值都引用了内存中的同一对象）
- 都是 BigInt 且具有相同的数值
- 都是 symbol 且引用相同的 symbol 值
- 都是数字且
- 都是 +0
- 都是 -0
- 都是 NaN
- 都有相同的值，非零且都不是 NaN

也就是说，当一个对象比较时比较的时引用地址，类似于 == 比较，但是不同的是，==比较的时候会进行类型转换，该方法不会。


## React.forwardRef
- 作用
ref暴露DOM节点给父组件

- 语法

```js
const Input = forwardRef((props,ref)=>{
    return <input type="text" ref={ref}/>
})

function App() {
    const inputRef= useRef(null);
    const onchange = () =>{
        console.log(inputRef)
        inputRef.current.focus()
    }
    return (
        <div className="App">
            <Input ref={inputRef} />
            <button onClick={onchange}>focus</button>
        </div>
    );
}
```