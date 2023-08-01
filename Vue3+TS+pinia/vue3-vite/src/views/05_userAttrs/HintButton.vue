<script setup lang="ts">
//引入useAttrs方法：获取标签上属性与事件
import {useAttrs} from "vue"; //返回对象
let $attrs = useAttrs();

// 如果使用props接收属性和属性值，则useAttrs是接收不到的
//因为props的优先级高于useAttrs
console.log($attrs)
</script>

<template>
<div>
  <el-button :="$attrs">子组件</el-button>
</div>
</template>

<style scoped>

</style>