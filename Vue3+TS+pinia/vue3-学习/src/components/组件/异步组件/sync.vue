<script setup lang="ts">
/**
 * 异步组件：需要通过defineAsyncComponent方法引入组件
 *    （1） const SyncVue = defineAsyncComponent(()=>import("@/components/sync.vue"))
 *    （2）const SyncVue2 = defineAsyncComponent({
 *          // 加载异步组件时使用的组件
 *          loader: () => import('coms/组件/异步组件/sync.vue'),
 *          // 异步加载的等待组件
 *          loadingComponent: Skeleton,
 *          // 加载失败时使用的组件
 *          errorComponent: Skeleton,
 *         // 在显示加载组件之前延迟。默认值：200ms。
 *          delay: 1000,
 *         // 超过给定时间，则会显示错误组件。默认值：Infinity。
 *          timeout: 3000
 *        })
 *
 *  搭配<Suspense>使用（试用）
 *   接受两个插槽：#default 和 #fallback。它将在内存中渲染默认插槽的同时展示后备插槽内容。
 *  <Suspense>
 *     <div>
 *       <SyncVue/>
 *     </div>
 *     <!--    加载异步时执行下面-->
 *     <template #fallback>
 *       <Skeleton/>
 *     </template>
 *   </Suspense>
 */
import {axios} from '../../../server/axios'
interface Data {
  data:{
    name:string,
    age:number,
    url:string,
    desc:string
  }
}
const {data} = await axios.get<Data>('./data.json')
</script>

<template>
<div class="sync">
  <div class="sync-content">
    <div><img :src="data.url" alt=""></div>
    <div class="sync-pop">
      <div>{{data.name}}</div>
      <div>&nbsp;{{data.age}}</div>
    </div>
  </div>
  <hr>
  <div>{{data.desc}}</div>
</div>
</template>

<style lang="less" scoped>
@bgColor: #eee;
@conColor: #ccc;
.sync{
  background-color: @bgColor;
  width: 60%;
  height: 300px;
  margin: auto;
  padding: 20px;
  .sync-content{
    display: flex;
    height: 100px;
    width: 2000px;
    align-items: center;
    margin-left: 10px;
    img{
      height: 100px;
      border-radius: 50%;
      background-color: @conColor;
    }
    .sync-pop{
      display: flex;
      margin-left: 20px;
    }
  }
}
</style>