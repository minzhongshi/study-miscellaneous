<script setup lang="ts">
/**
 * vuex:集中式管理状态容器，可以实现任意组件之间的通讯 核心：
 *  1、state 存储数据
 *  2、mutations 唯一修改数据
 *  3、actions 处理异步、处理业务
 *  4、getters 计算属性
 *  5、modules 模块式开发
 */

/**
 * pinia:集中式管理状态容器，可以实现任意组件之间的通讯 核心：
 *  1、state 存储数据
 *  2、actions 修改数据、处理异步、处理业务
 *  3、getters 计算属性
 * 写法：(文件位置：./src/store)
 *  1、选择式
 *    修改数据：
 *       （1）使用返回的函数直接修改其属性
 *            infoStore.count++
 *       （2）使用返回函数上的$patch方法
 *            infoStore.$patch({count:222})
 *       （3）使用自定义方法，在actions中定义方法，可传参
 *            infoStore.updateNum()
 *            仓库：this.count++
 *            注：在方法内部要用this，this指向仓库对象
 *  2、组合式
 *    修改数据：
 *       （1）使用返回的函数直接修改其属性
 *            todoStore.todos[0].title = '喝水'
 *       （2）使用computed计算属性，将计算值返回就能获取
 *            const total = computed(()=>{
 *              return arr.reduce((prev,next)=>{
 *                 return prev+next
 *              },0)
 *            })
 *       （3）使用自定义方法，在return中定义方法，可传参
 *            updateTodo(){
 *                todos.push({id:3,title: '组合式API'})
 *             }
 *            注：在方法内部要用this，this指向仓库对象
 */
import Child from "./Child.vue";
import Child1 from "./Child1.vue";
</script>

<template>
<div class="box">
  <h1>pinia</h1>
  <div class="container">
    <Child/>
    <Child1/>
  </div>

</div>
</template>

<style scoped>
.box{
  width: 600px;
  height: 400px;
  background-color: deepskyblue;
}
.container{
  display: flex;
}
</style>