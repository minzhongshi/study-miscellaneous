<script setup lang="ts">
import {h} from "vue";
import {message} from "./message";

interface Props {
  type: 'success' | 'error'
}

/**
 * h 函数有三个参数,第一个是创建的结点，第二个是节点属性，第三个是节点内容
 * 场景：
 *    封装一些小组件（弹窗、按钮等）
 * @param props
 * @param ctx
 * @constructor
 */
const Btn = (props:Props,ctx:any) =>{
  return h('button',
      {
        style: {
          color:props.type === 'success'? 'green': 'red'
        },
        onClick:()=>{
          ctx.emit('click','smz')
          console.log('点击了按钮',props.type)
        }
      },
      ctx.slots.default()
  )
}

const messages = () =>{
  message('这是一个提示窗')
}

</script>

<template>
<Btn type="success">编辑</Btn>
  <Btn type="error">删除</Btn>
<button @click="messages">点击调用提示组件</button>
</template>

<style scoped>
body{

}
</style>