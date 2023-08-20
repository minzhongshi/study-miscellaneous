<script setup lang="ts">
/**
 * 插槽:
 *   1、默认插槽
 *     在子组件直接使用slot标签<slot></slot>
 *     在父组件中子组件标签里添加传递的结构
 *   2、具名插槽
 *     在子组件直接使用slot标签<slot name="a"></slot>
 *     在父组件中子组件标签里添加template传递的结构，并用v-slot:（简写: #）指定是那个插槽
 *      <template v-slot:a>
 *         <pre>早死晚死都得死</pre>
 *       </template>
 *   3、作用域插槽
 *      可传递数据的插槽,子组件可以将数据回传给父组件，父组件可以定义该数据以某种方式或者外观在子组件内部展示
 *      子组件可以在slot标签上传递数据<slot :row="item" :index="index"></slot>
 *      父组件在template用v-slot用接收数据并定义子组件内部显示方式
 *         <template v-slot="{row,index}">
 *           <span :style="{color:row.done?'green':'red'}">{{row.title}}--{{index}}</span>
 *         </template>
 */
import Text from "./Text.vue";
import Text1 from "./Text1.vue";
import {reactive} from "vue";
let todos = reactive([
  {id:1,title:'吃饭',done:true},
  {id:2,title:'睡觉',done: false},
  {id:3,title:'玩游戏',done: false},
  {id:4,title:'玩',done: true},
])
</script>

<template>
  <div>
    <h1>solt</h1>
    <Text>
      <pre>自古人生谁无死</pre>
      <template v-slot:a>
        <pre>早死晚死都得死</pre>
      </template>
    </Text>

    <Text1 :todos="todos">
      <template v-slot="{row,index}">
        <span :style="{color:row.done?'green':'red'}">{{row.title}}--{{index}}</span>
      </template>
    </Text1>
  </div>
</template>

<style scoped>

</style>