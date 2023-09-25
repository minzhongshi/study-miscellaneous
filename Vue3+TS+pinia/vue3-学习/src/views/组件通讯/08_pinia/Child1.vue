<script setup lang="ts">
import userTodoStore from "../../../store/modules/todo";

let todoStore = userTodoStore()
const updateTodo=()=>{
  todoStore.updateTodo()
}
</script>

<template>
  <div class="child">
    <p>{{ todoStore.todos }}</p>
    <button @click="updateTodo">修改</button>
  </div>
</template>

<style scoped>
.child{
  width: 200px;
  height: 200px;
  background-color: red;
}
</style>