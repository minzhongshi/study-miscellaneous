<script setup lang="ts">
/**
 * <TransitionGroup>用来列表过度，如v-for渲染时。
 *   与<Transition>使用相同多了tag属性、move-class属性，
 *    tag属性可以在外层套一层该元素
 *    move-class可以自定义类名
 *     用于自定义过渡期间被应用的 CSS class。
 *     在模板中使用 kebab-case，例如 move-class="xxx"
 */

/**
 * lodash库（一致性、模块化、高性能的 JavaScript 实用工具库）、
 *   引入需要安装声明文件 @types/lodash
 *
 */
import {ref} from "vue";
import _ from 'lodash'
let list = ref(Array.apply(null,{length:81} as number[]).map((_,index)=>{
  return {
    id:index,
    number:(index % 9) + 1
  }
}))
const random = () =>{
  list.value = _.shuffle(list.value)
}
</script>

<template>
  <div>
    <button @click="random">洗牌</button>
    <transition-group class="wraps" tag="div" move-class="lodash">
      <div class="items" :key="item.id" v-for="item in list">{{item.number}}</div>
    </transition-group>
  </div>
</template>

<style lang="less" scoped>
.wraps{
  display: flex;
  flex-wrap: wrap;
  width: calc(25px *10 + 9px);
  .items{
    width: 25px;
    height: 25px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.lodash{
  transition: all 1s;
}
</style>