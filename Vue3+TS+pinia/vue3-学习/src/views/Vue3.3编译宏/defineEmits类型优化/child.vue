<script setup lang="ts">
//JS写法
// const emit = defineEmits(['send'])
//TS写法
// const emit = defineEmits<{
//   (event:string,name:string):void
// }>()
/**
 * Vue3.3改进类型书写,更精简
 */
const emit = defineEmits<{
  'send': [name:string]
}>()
const send = () =>{
  emit('send','hello')
}
</script>

<template>

</template>

<style scoped>

</style>