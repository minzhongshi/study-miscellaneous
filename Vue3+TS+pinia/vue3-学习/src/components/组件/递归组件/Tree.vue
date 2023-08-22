<script setup lang="ts">
/**
 * 主要用于多数据嵌套关系，根据嵌套来渲染组件
 * 使用：
 * （1）直接使用组件名
 *     <Tree v-if="item?.children?.length" :data="item?.children"></Tree>
 * （2）在新的script标签中导出名称属性
 *     <script lang="ts">
 *      export default  {
 *        name:'smz'
 *      }
 * （3）在defineOptions对象里面定义name属性
 * 利用v-if判断递归终止条件，绑定data值为开始对象的子项集合
 *
 * 注：在递归组件加事件时，需要注意事件冒泡，可通过.stop防止冒泡
 *     vue3传递event使用$event传递
 */
interface Tree {
  name: string,
  checked: boolean,
  children?: Tree[]
}
defineProps<{
  data?:Tree[]
}>()
defineOptions({
  name: 'Tree2'
})
const clickTop =(item,e)=>{
  console.log(item)
  console.log(e)
}

</script>

<!--<script lang="js">-->
// export default  {
//   name: 'Tree1'
// }
<!--</script>-->
<template>
  <div @click.stop="clickTop(item,$event)" class="tree" v-for="item in data">
    <input v-model="item.checked" type="checkbox" ><span>{{item.name}}</span>
    <Tree v-if="item?.children?.length" :data="item?.children"></Tree>
<!--    <Tree1 v-if="item?.children?.length" :data="item?.children"></Tree1>-->
<!--    <Tree2 v-if="item?.children?.length" :data="item?.children"></Tree2>-->
  </div>
</template>

<style scoped>
.tree{
  margin-left: 25px;
}
</style>