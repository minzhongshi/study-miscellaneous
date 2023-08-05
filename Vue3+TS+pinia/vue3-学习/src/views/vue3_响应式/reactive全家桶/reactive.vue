<script setup lang="ts">
/**
 * reactive:
 *      对类型进行了约束，不能绑定普通数据类型，只能绑定引用类型：Array Object Map Set
 *      reactive proxy不能直接赋值，否则破坏响应式对象
 *        解决：数组 可以push加解构
 *             添加对象将数组当成属性使用
 * readonly:
 *      用来将其变为只读的
 *      注：与 reactive一起使用时没有作用
 * shallowReactive：
 *      浅层响应式,与shallowRef类似，存在相同的问题和reactive一起使用会影响响应
 */
import {reactive, readonly, shallowReactive} from "vue";


const obj = reactive({name:"smz",age:18})

// 数组赋值
let arr = reactive([1,2,3])
let arr2 = reactive({
  arr:[1,2,3]
})
const arrValue = () =>{
  const list = [4,5,6]
  arr = [...arr,...list] // 不可用 不更新视图
  console.log(arr)
}
const arrValue2 = () =>{
  const list = [4,5,6]
  arr.push(...list) // 数组自带方法 加解构
}
const arrValue3 = () =>{
  const list = [4,5,6]
  arr2.arr = [...arr2.arr,...list] // 将数组变为对象属性
}

// readonly
const Readonly:Object = readonly(obj)
Readonly.name = "王五"
console.log(Readonly)

// shallowReactive只能改到foo
const obj2:Object = shallowReactive({
  foo:{
    bar:{
      num:2
    }
  }
})



</script>

<template>
  <h3>------------数据类型----------------</h3>
  <div>{{obj}}</div>
  <div>{{arr}}</div>
  <h3>------------数组赋值----------------</h3>
  <div>{{arr}}</div>
  <button @click="arrValue">数组赋值不可用</button>
  <br>
  <button @click="arrValue2">解决1</button>
</template>

<style scoped>

</style>
