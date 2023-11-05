# vue常见优化手段
## 使用key
>对于通过循环生成的列表，应给每个列表项一个稳定唯一的key，这样有利于在列表变动时，尽量少的删除、新增、改动元素


## 使用冻结对象
>对于不会变动的对象，应使用`Object.freeze()`冻结对象，这样可以避免vue的响应式系统对其进行追踪，从而提高性能
## 使用函数式组件
>对于纯渲染的组件，也不需要响应式，应使用函数式组件，因为函数式组件不会被实例化，普通组件会被实例化，实例化需要创建各种对象，会产生额外的内存和时间开销

创建：
```js
Vue.component('my-component', {
  functional: true,
  // Props 是可选的
  props: {
    // ...
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  }
  // render: h('el-input', { props, children, slots, parent, listeners, injections }) {
  //   // ...
  // }
})
```
`context`包含：
- `props`：提供所有 prop 的对象
- `children`：VNode 子节点的数组
- `slots`：一个函数，返回了包含所有插槽的对象
- `scopedSlots`：(2.6.0+) 一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。
- `data`：传递给组件的整个数据对象，作为 createElement 的第二个参数传入组件
- `parent`：对父组件的引用
- `listeners`：(2.3.0+) 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是 data.on 的一个别名。
- `injections`：(2.3.0+) 如果使用了 inject 选项，则该对象包含了应当被注入的属性。


使用：
```html
<my-component :foo="baz" :bar="qux"></my-component>
```
## 使用计算属性
>对于需要经过计算才能得到的数据，应使用计算属性，而不是方法，因为计算属性会缓存计算结果，只有在依赖的数据变化时才会重新计算，而方法每次都会重新计算(防止数据的冗余，防止数据不统一)

创建：
```js   
data: {
  a: 1
},
computed: {
  // 仅读取
  aDouble: function () {
    return this.a * 2
  },
  // 读取和设置
  aPlus: {
    get: function () {
      return this.a + 1
    },
    set: function (v) {
      this.a = v - 1
    }
  }
}
```
使用：
```html
<p>
  a: <input v-model="a">
</p>
<p>
  aDouble: {{ aDouble }} <br>
  aPlus: {{ aPlus }}
</p>
```

## 非实时绑定的表单项
>对于非实时绑定的表单项，应使用`v-model.lazy`，使用v-model修饰符这样可以避免每次输入都触发更新，而是在失去焦点时才触发更新，原因是.lazy绑定的是change事件，而不是input事件

> 或者使用防抖函数，防止频繁触发更新，使用自定义指令

创建自定义指令防抖：
```js
Vue.directive('debounce', {
  inserted: function (el, binding) {
    let timer
    el.addEventListener('input', () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        el.dispatchEvent(new Event('change'))
      }, binding.value || 500)
    })
  }
})
```
使用：
```html
<input v-model="msg" v-debounce="500">
```

## 保持对象引用稳定
>在绝大部分情况下，vue触发更新的条件是：数据发生变化，而不是数据的引用发生变化，所以在使用对象时，应保持对象的引用稳定，而不是每次都创建新的对象，这样可以避免不必要的更新，在数据没有发生改变的情况下，哪怕是重新赋值，也不会触发更新

vue源码判断数据有没有发生改变：
```js
function hasChanged (value, oldValue) {
  /* eslint-disable no-self-compare */
  return value !== oldValue && (value === value || oldValue === oldValue)
}
```

- 对于原始数据类型，保持其值不变就可以了
- 对于对象类型，保持其引用不变即可，也就是在原对象做修改，而不是重新赋值

## 使用v-show代替v-if
>对于频繁切换的元素，应使用v-show代替v-if，因为v-if每次都会重新创建元素，而v-show只是切换元素的display属性
## 使用延迟装载（defer）
>对于不是首屏渲染的组件或者渲染的组件过于庞大，应使用延迟装载
具体实现方式有很多，如：
- 使用异步组件的方式
- 利用 `requestAnimationFrame`事件分批渲染内容，让组件按照指定顺序一个一个渲染出来。
  使用mixins混入并控制顺序：
  ```js
    export default function (delay = 0) {
        return {
            data () {
            return {
                frameCount: 0
            }
            },
            mounted () {
               const refreshFrameCount = () => {
                this.frameCount++
                if (this.frameCount < delay) {
                    refreshFrameCount()
                 } 
                }
                refreshFrameCount()
            },
              methods: {
                    async defer (showInFrameCount) {
                          return this.frameCount >= showInFrameCount
                   }
        }
    }
  }
    ```
  使用:
    ```html
    <template>
        <div>
            <div v-if="defer(1)">1</div>
            <div v-if="defer(2)">2</div>
            <div v-if="defer(3)">3</div>
            <div v-if="defer(4)">4</div>
            <div v-if="defer(5)">5</div>
            <div v-if="defer(6)">6</div>
            <div v-if="defer(7)">7</div>
            <div v-if="defer(8)">8</div>
            <div v-if="defer(9)">9</div>
            <div v-if="defer(10)">10</div>
        </div>
    ```
  ```js
    import defer from './defer'
    export default {
        mixins: [defer(10)],
        components: {
            defer
        }
    }
  ```
## 使用keep-alive
>对于频繁切换的组件，应使用keep-alive缓存组件，这样可以避免每次都重新创建组件，而是直接从缓存中获取组件

> keep-alive的原理是将组件的vnode缓存起来，当组件切换时，会先从缓存中获取组件的vnode，如果有则直接渲染，如果没有则重新创建组件的vnode并缓存起来

> keep-alive的缓存策略是LRU算法，即最近最少使用算法，当缓存的组件超过max属性时，会将最近最少使用的组件从缓存中删除

> keep-alive是通过name属性来标识组件的，所以在使用keep-alive时，应为组件设置name属性，否则会报错

使用：
```html
<keep-alive>
  <component :is="currentTabComponent"></component>
</keep-alive>
```


## 长列表优化
>对于长列表，应使用虚拟滚动，这样可以避免渲染过多的dom节点，从而提高性能
> 虚拟滚动的原理是只渲染可视区域的dom节点，当滚动时，会动态的渲染可视区域的dom节点，从而避免渲染过多的dom节点
> 虚拟滚动的实现方式有很多，如：
- 使用`vue-virtual-scroller`第三方库组件
- 封装虚拟滚动组件，利用`IntersectionObserver`API监听可视区域的dom节点，当dom节点进入可视区域时，再渲染该dom节点

## 打包体积优化
>对于打包体积过大的项目，应使用按需加载，这样可以避免主包一次性加载过多的代码，从而提高性能
> 按需加载的实现方式有很多，如：
- 使用`import()`动态导入组件
```js
import('./Foo.vue')
```
- 使用`vue-router`的`component`属性的函数模式
```js
const Foo = () => import('./Foo.vue')
```
- 使用`vue-router`的`webpackChunkName`注释
```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
```
- 使用`webpack`的`require.ensure`方法
```js
require.ensure([], () => {
  const Foo = require('./Foo.vue')
})
```
- 使用`webpack`的`bundle-loader`方法
```js
const Foo = bundleLoader('./Foo.vue')
```
- 使用`vite`的`import.meta.glob`方法
```js
const modules = import.meta.glob('./Foo.vue')
```
- 使用`vite`的`defineAsyncComponent`方法
```js
const Foo = defineAsyncComponent(() => import('./Foo.vue'))
```
- 使用`vite`的`load`方法
```js
const Foo = load('./Foo.vue')
```
