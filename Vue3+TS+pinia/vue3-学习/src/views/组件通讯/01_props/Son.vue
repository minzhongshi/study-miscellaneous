<script setup lang="ts">
import {defineProps, PropType} from "vue";
//需要用defineProps方法接收父组件传递的数据
//该方法不用引入，为Vue3自带，直接使用
//通过props获取的数据是代理对象
//props的数据是只读的，不可修改
//TS设置默认值需要用withDefaults(<defineProps>,{<默认值定义>}) 这是TS自带
const props = withDefaults(defineProps<{ info:string, money:number }>(),
    {
  info: "默认值",
    money:0
})

// JS方式
// const props = defineProps({
//   info:{
//     type:String,
//     default:"默认值"
//   },
//   money:{
//     type:Number,
//     default:0
//   }})
console.log(props.info)
</script>

<template>
  <div>
    <p>{{info}}</p>
    <p>{{money}}</p>
  </div>
</template>

<style scoped>

</style>