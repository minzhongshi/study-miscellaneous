<template>
  <MyFrom ref="myFormRef" :="formConfiog" v-model:modelValue='formData'>
    <template #header>
      <span>标题</span>
    </template>
    <template #bottom>
      <el-button type="primary" @click="submit()">提交</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </template>
  </MyFrom>
</template>

<script setup lang="ts">
import MyFrom from "../../components/二次封装ElementPlus/MyFrom.vue";
import {ref} from "vue";
import formResponse from "../../utils/formResponse";
import formConfiog from "../../config/form/formConfig";

// 配置表单数据转换成响应式对象
let formData = formResponse(formConfiog.formItems)

const myFormRef = ref()
//重置
const resetForm = ()=>{
  myFormRef.value?.resetForm()
}
//提交
const submit = ()=>{
  console.log(formData)
}
</script>

<style scoped>
</style>