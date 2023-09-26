<template>
<div style="background-color: red;width: 100vw;height: 50vh">这是A</div>
  <div>这是路由{{$route}}</div>
<!--  <div>这是路由传参query:{{route.query.name}}{{route.query.age}}</div>-->
  <div>这是路由传参params:{{route.params.id}}</div>
</template>

<script setup lang="ts">
import {getCurrentInstance} from 'vue'
import {useRoute,useRouter} from 'vue-router'
const route = useRoute()
const router = useRouter()

console.log(route)
console.log(router)
console.log(getCurrentInstance())
let stateObj = {
  foo: "bar",
};

// history.pushState(stateObj, "", "/bar.html");
</script>

<style scoped>

</style>