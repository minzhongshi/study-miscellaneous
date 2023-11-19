<script setup lang="ts">
/**
 * 依赖注入
 * vue3 提供了provide(提供)与inject(注入)，可以实现隔辈组件通讯
 * 利用了原型链，在父组件provides上创建新对象：Object.create().parentProvides
 * 子组件使用时在原型链上查找
 * provide是个方法提供两个参数,提供数据
 *     提供数据的key
 *     组件提供的数据
 * inject通过注入祖先提供的数据，利用key值来获取数据
 * 注：后辈组件是可以修改祖先组件传过来的的值，并影响祖先组件的数据
 * 个人建议：对于子改变父组件数据尽量不要用，保证数据的单向流动，防止父组件数据更改后影响其他组件
 * 以下为提供的两个将数据变为非响应式数据的方法
 * toRaw：把一个响应式对象转化为普通对象
 * markRaw：把某个数据，标记为普通对象，当我们把它放到响应式对象中，也依然是非响应式的
 */
import Child from "./Child.vue";
import {ref, provide, reactive, InjectionKey} from "vue";
let car = ref<String>("大众")
type Car = {
  car:string
}
type CarData = {
  [index: number]:Car
}
let cars:CarData = reactive([{car:'大众'},{car:'宝马'}])
const TOKEN = Symbol() as InjectionKey<CarData>
provide(TOKEN,cars)
</script>

<template>
  <div class="box">
    <h1>Provide与Inject</h1>
    <p v-for="item of cars">{{item.car}}</p>
    <hr>
   <Child/>
  </div>
</template>

<style scoped>
.box{
  width: 100vw;
  height: 600px;
  background-color: deepskyblue;
}
</style>