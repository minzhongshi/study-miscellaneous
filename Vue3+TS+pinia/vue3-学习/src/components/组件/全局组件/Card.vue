<script setup lang="ts">
/**
 * 在main.ts文件中引入组件
 * 利用app.component('<组件名称>'，<引入组件>)将组件挂载到全局
 */
</script>

<template>
<div class="card">
  <header>
    <div>标题</div>
    <div>副标题</div>
  </header>

  <section>
    内容
  </section>
</div>
</template>

<style scoped lang="scss">
$border: #ccc;
.card {
  border: 1px solid $border;
  width: 400px;
  header{
    display: flex;
    justify-content: space-between;
    padding: 5px;
    border-bottom: 1px solid $border;
  }
  section{
    padding: 5px;
    min-height: 300px;
  }
}
</style>