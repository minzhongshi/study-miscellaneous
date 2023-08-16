<script setup lang="ts">

</script>

<template>
  <div class="smz-text">
    123
    <div class="smz-text__inner">el</div>
    <div class="smz-text--success">test</div>
  </div>
</template>

<style lang="scss" scoped>
/**
 * layout布局：左侧位菜单 右侧有头部 头部下面为内容
 * BEM架构：css架构 （block elements modify） 样式规范 例如：
 * el-input :el 为名字前缀 input为整个块
 * el-input__wrapper : __wrapper 为块内元素 ===> e
 * el-button--primary : --primary 为修饰词 ===> m
 */
@include b(text){
  color: red;
  @include e(inner){
    color: #535bf2;
  }
  @include m(success){
    color: hotpink;
  }
}

</style>
