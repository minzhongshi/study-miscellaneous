<script setup lang="ts">
/**
 * ref:
 *     深层次的响应式,一般用来做普通类型的响应式如，除arr\object的数据类型，底层arr和object实现也是走reactive
 *     可以获取dom元素具体使用场景在 组件通讯-->06_ref-children-parent中
 * isRef:
 *     用来判断某个对象是否为响应式对象 传入参数：变量，返回结果为：boolean
 * shallowRef:
 *     浅层次的响应式（只会在响应到 xxx.value）
 *     第三方库对象代理不能用proxy时可以用这个
 *     注：不能和ref混用，当两者变量同时出现在template中shallowRef会被影响视图的更新
 *         ref底层调用triggerRefValue-->triggerEffects 使得强制更新收集的依赖，
 * triggerRef:
 *     强制更新收集的依赖
 * customRef:
 *     自定义响应式，浅层次的响应式
 */
import {ref, isRef, shallowRef, triggerRef, customRef, nextTick} from 'vue';
import * as ts from "typescript/lib/tsserverlibrary";
import LogLevel = ts.server.LogLevel;

/**
 * ref响应式数据类型
 * @type {Ref<UnwrapRef<number>>}
 */
const number = ref(0);
const string = ref('string');
const boolean = ref(true);
const bigint = ref(9007199254740991)
const symbol = ref(Symbol())
const Null = ref(null)
const obj = ref({name:"obj",index:2})
const arr = ref(['arr',1])
console.log(number)
console.log(string)
console.log(boolean)
console.log(bigint)
console.log(symbol)
console.log(Null)
console.log(obj)
console.log(arr);

/**
 * ref获取dom
 */
const dom = ref<HTMLDivElement>()
nextTick(()=>{
  console.log(dom.value?.innerText)
})


/**
 * ref对shallowRef的影响
 */
const REF = ref({name:"Smz"})
const ShallowRef = shallowRef({name: "smz"})
const change = () =>{
  // REF.value.name = 'ref'
  ShallowRef.value.name = '被影响了'
  // ShallowRef.value = {
  //   name: "123"
  // }
  console.log(ShallowRef)
}


/**
 * 立即执行函数
 * isRef作用
 */
(() => {
  console.log(isRef(arr))
})()

/**
 * customRef
 * @param value 响应式
 * @track 收集依赖
 * @trigger 触发依赖
 * @constructor
 */
function MyRef<T>(value: T) {
  return customRef((track, trigger)=>{
    return {
      get() {
        track()
        return value
      },
      set(newVal) {
        // 添加代码
        value = newVal
        trigger()
      }
    }
  })
}
</script>


<template>
  <h3>------------数据类型----------------</h3>
  <div>{{number}}</div>
  <div>{{string}}</div>
  <div>{{boolean}}</div>
  <div>{{bigint}}</div>
  <div>{{symbol}}</div>
  <div>{{Null}}</div>
  <div>{{obj}}</div>
  <div>{{arr}}</div>
  <h3>------------ref获取dom----------------</h3>
  <div ref="dom">123</div>
  <h3>------------ref对shallowRef的影响----------------</h3>
  <div>ref:{{REF}}</div>
  <div>shallowRef:{{ShallowRef}}</div>
  <button style="color: hotpink" @click="change">ref对shallowRef的影响</button>
</template>

<style scoped>

</style>