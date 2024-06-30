## 创建

- 模板： vanilla，vanilla-ts，vue，vue-ts，react，react-ts，preact，preact-ts，lit，lit-ts，svelte，svelte-ts
```npm
pnpm create vite 项目名称 --template 模板
```

## useState 自动推导
>Ts自动会对传入默认值做自动推导，不需要标注类型

- 场景：明确初始值


## useState 传递泛型函数
> useState 本身是个泛型函数，可以传入具体的自定义类型

```ts
type User = {
    name: string,
    age: number
}
 const [user,setUser] = useState<User>({
    name: 'smz',
    age: 13
})
const [user,setUser] = useState<User>(()=>{
    return{
        name: 'smz',
        age: 13
    }
})
```

## useState 初始值null
>不清楚初始值

```ts
type User = {
    name: string,
    age: number
}
    const [user,setUser] = useState<User | null>(null)
```

## Props ts基本使用
>本质就是给函数的参数做类型注解，可以使用type对象或者interface接口来做注解
```ts
type Props = {
    className: string,
    title?: string
}
function Button(props:Props){
    const {className} = props
    return <button className={className}>点击</button>
}

<Button  className={'smz'} />
```

## Props ts children属性
> children 是一个特殊的prop，支持多种不同类型数据的传入，需要通过一个内置的ReactNode类型来做注解

ReactNode类型：

string 、 number、 ReactElement、ReactFragment、ReactPortal、boolean、null 以及 undefined

```ts
type Props = {
    className: string,
    title?: string,
    children: React.ReactNode
}
function Button(props:Props){
    const {className,children} = props
    return <button className={className}>{children}</button>
}

<Button  className={'smz'} ><span>click</span></Button>
```

## Props 为事件prop添加类型
