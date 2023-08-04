<script setup lang="ts">
// vue3框架提供一个方法useAttrs方法，它可以获取组件身上的属性与事件
import {Edit} from '@element-plus/icons-vue'
import HintButton from "./HintButton.vue";

</script>

<template>
<div>
  <h1>userAttrs</h1>
  <el-button type="primary" size="small" icon="Edit"></el-button>
<!--  自定义组件-->
  <HintButton type="primary" size="small" :icon="Edit"></HintButton>
</div>
</template>

<style scoped>

</style>