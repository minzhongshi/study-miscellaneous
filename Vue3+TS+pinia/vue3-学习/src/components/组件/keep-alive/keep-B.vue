<script setup lang="ts">
import {reactive, ref} from "vue";

const form = reactive({
  name: ''
})
</script>

<template>
  <div>
    <p>我是组件B</p>
    <el-form :model="form" label-width="120px">
      <el-form-item label="Activity name">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>