<script setup lang="ts">
/**
 * Teleport Vue3新特性 ==>（React Portal）。
 * 能够将模板渲染到指定的DOM结点，不受父级样式、控制属性等的影响，但data、prop能够共用的技术
 * 用法：
 *    to:通过to属性绑定插入元素的位置,支持多种选择器
 *    disable:控制该功能的启动与关闭 ==>true:关闭
 */
</script>

<template>
  <div>
    这是传送组件
  </div>
</template>

<style scoped>
div{
  position: absolute;
  width: 400px;
  height: 400px;
  background-color: cyan;
  flex-direction: column;
  left: 50%;
  top: 50%;
  margin-left: -200px;
  margin-top: -200px;
}
</style>