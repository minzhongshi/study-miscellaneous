<template>
<div class="container">
  <FormItemComp :form-state="root"/>
</div>
</template>

<script setup lang="ts">
import FormItemComp from "../../../components/动态表单/FormItemComp.vue";
import root from "../../../config/form/FormPageDatas";
</script>

<style scoped>
.container{
  width:80%;
  margin:1em auto;
}
</style>