<script setup lang="ts">
import {Directive} from "vue";

// 用户id
localStorage.setItem('userId','smz')
// mock后台数据
const permission = [
  'smz:shop:edit',
  // 'smz:shop:create',
  'smz:shop:delete'
]
const userId = localStorage.getItem('userId') as string
const vHasShow:Directive<HTMLElement,string> = (el,bingding)=>{
  // 当后台返回的权限列表中没有对应的权限，则将其隐藏
  if (!permission.includes(userId+':'+bingding.value)){
    // 这里感觉还要对用户在控制台的操作做一些操作，防止用户直接改样式
    // 监听用户对改元素的操作，在改变其值时进行样式添加
    el.style.display = 'none'
  }
}
</script>

<template>
<div class="btns">
  <button v-has-show="'shop:create'">创建</button>
  <button v-has-show="'shop:edit'">编辑</button>
  <button v-has-show="'shop:delete'">删除</button>
</div>
</template>

<style lang="less" scoped>
.btns{

  button{
    margin: 10px;
    padding: 10px;
    border: cyan solid 1px;
  }
}
</style>