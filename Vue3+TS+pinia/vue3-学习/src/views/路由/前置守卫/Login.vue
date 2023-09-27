<template>
<div class="login">
  <el-card class="box-card">
    <el-form ref="form" :rules="rules"  :model="formInline" class="demo-form-inline">
      <el-form-item label="账号" prop="user">
        <el-input v-model="formInline.user" placeholder="输入账号"  />
      </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formInline.password" placeholder="输入密码" />
        </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script setup lang="ts">
import { reactive,ref } from 'vue'
import {useRouter} from 'vue-router'
import type {FormRules,FormItemRules,FormInstance,ElMessage} from 'element-plus'
const router = useRouter()
type Form = {
  user: string,
  password: number
}
type Rules = {
  [K in keyof Form]?:Array<FormItemRules>
}
const formInline = reactive<Form>({
  user: '',
  password: ''
})
const form = ref<FormInstance>()
const rules = reactive<Rules>({
  user:[
    {
      required:true,
      message:'请填写账号',
      type: 'string',
      trigger: 'blur'
    }
  ],
  password:[
    {
      required:true,
      message:'请填写密码',
      trigger: 'blur'
    }
  ],
})

const onSubmit = () => {
  form.value.validate((validate)=>{
    if (validate){
      localStorage.setItem('token','1')
      router.replace('/home')
    }
  })

}
</script>

<style scoped>
.login{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
.box-card {
  width: 480px;
}
</style>