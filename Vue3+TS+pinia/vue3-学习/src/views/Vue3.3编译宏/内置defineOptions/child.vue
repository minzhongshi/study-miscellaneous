<script setup lang="ts">/**
 * 在使用了compositionAPI+setup语法糖模式创建了组建后，
 * 除了props, emits, expose, slots外 其他组件属性如：name、inheritAttrs都无法定义
 * 所以添加了defineOptions来透传给OptionsAPI定义组件一些属性
 * 在Vue3.3之前使用unplugin-vue-define-options插件可以使用OptionsAPI的属性
 */
import {defineOptions} from "vue";

defineOptions({
  name: '这是组件名称',
  inheritAttrs: false
})
</script>

<template>

</template>

<style scoped>

</style>