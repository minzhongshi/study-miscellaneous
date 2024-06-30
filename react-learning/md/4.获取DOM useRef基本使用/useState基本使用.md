# useRef钩子函数

- 使用useRef创建ref对象，并与JSX绑定
- 在DOM可用时，通过inputRef.current拿到DOM对象

```javascript
function App() {
    const inputRef = useRef(null);
    function f() {
        console.dir(inputRef.current);
    }
    return (
        <div className="App">
            <input type="text"
                   ref={inputRef}
            />
            <button onClick={f}>点击</button>
        </div>
    );
}
```

DOM可用：在渲染完毕之后，才可用
