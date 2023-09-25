<template>
<div>
  pinia:{{}}
  change :
  <button @click="change">change</button>
  <button @click="reset"></button>
</div>
</template>

<script setup lang="ts">
import {useTestStore} from "../../../store/modules/TEST";
const Test = useTestStore()
/**
 *  修改值的方法：
 *  1. Test.current++
 *  2. Test.$patch({current:888,name:'smz2'})
 *  3. Test.$patch((state)=>{state.current = 999}) 这里的state就是仓库里的state
 *  4. Test.$state = {current:2000,name: "smz3"} 该方法需要修改整个对象
 *  5. actions:{setCurrent(number){this.current = number}}
 *     Test.setCurrent(28888)
 *     在actions内定义方法，用this直接修改值
 */

/**
 * state解构
 *    const {current,name} = Test
 *    这样解构出来的值是不具备数据响应式的
 *    需要使用 storeToRefs 包裹 和toRef效果一致
 *    import {storeToRefs} from 'pinia'
 *    const {current,name} = storeToRefs(Test)
 */

const change = () =>{
  Test.current++
  Test.$patch({
    current:888,
    name:'smz2'
  })
  Test.$patch((state)=>{
    state.current = 999
  })

  Test.$state = {
    current:2000,
    name: "smz3"
  }
  Test.setCurrent(28888)
}

// const {current,name} = Test
import {storeToRefs} from 'pinia'
const {current,name} = storeToRefs(Test)

const reset= ()=>{
  Test.$reset()
}

Test.$subscribe((args,state)=>{
  console.log(args)
  console.log(state)
},{
  detached:true,
  deep:true,
  flush:'post'
})

Test.$onAction(({ after, onError })=>{
  // 你可以在这里创建所有钩子之间的共享变量，
  // 同时设置侦听器并清理它们。
  after((resolvedValue) => {
    // 可以用来清理副作用
    // `resolvedValue` 是 action 返回的值，
    // 如果是一个 Promise，它将是已经 resolved 的值
  })
  onError((error) => {
    // 可以用于向上传递错误
  })
},true)
</script>

<style scoped>

</style>
