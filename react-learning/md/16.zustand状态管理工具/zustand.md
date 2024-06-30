## 使用

1. create传入一个函数参数，函数必须返回一个对象 对象内部编写状态数据和方法
2. set是用来修改数据的方法
  - 参数是函数 需要用到旧数据的场景
  - 参数是一个对象

```js
import {create} from "zustand";

// 创建store
const useStore = create((set)=>{
  return {
    // 状态
    count: 0,
    inc: ()=>{
      set((state)=>({
        count:state.count + 1
      }))
        set({count: 100})
    }
  }
})

// 绑定store到组件
function App() {
  const {count,inc} = useStore();
  return (
    <div className="App">
      <button onClick={inc}>{count}</button>
    </div>
  );
}
```

## 异步支持
>对于异步支持不需要特殊操作，直接在函数中编写异步逻辑，最后只用调用set方法传入即可

-语法
```js
 listData: [],
    //异步方法
    fetchList: async ()=> {
      const  res = await fetch(URL)
      const jsonData = await  res.json()
      //调用更新
      set({
        listData: jsonData.data.channels
      })
    }
```


## 切片模式
>当单个store比较大时，可以哎呀那个切片模式 进行拆分组合

```js
const createCounterStore = (set) =>{
  return {
    count: 0,
    setCount: ()=>{
      set((state)=>({
        count:state.count + 1
      }))
    }
  }
}

const createCounterStore2 = (set) =>{
  return {
    listData: [],
    //异步方法
    fetchList: async ()=> {
      const  res = await fetch(URL)
      const jsonData = await  res.json()
      //调用更新
      set({
        listData: jsonData.data.channels
      })
    },
  }
}
```