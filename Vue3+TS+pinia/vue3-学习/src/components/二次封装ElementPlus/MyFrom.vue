<template>
  <div class="header" :style="style.header">
    <slot name="header"></slot>
  </div>
  <el-form
      :label-width="labelWidth"
      :inline="inline"
      :label-position="labelPosition"
      :rules="rules"
      :model="modelValue"
      ref="ruleFormRef"
  >
    <template v-for="item in formItems" :key="item.label">
      <el-form-item :prop="item.field" :label="item.label" >
<!--        输入框-->
        <template v-if="item.type === 'input'">
          <el-input v-model="modelValue[item.field]"  :placeholder="item.placeholder"></el-input>
        </template>
<!--        下拉框-->
        <template v-else-if="item.type === 'select'">
          <el-select :placeholder="item.placeholder" v-model="modelValue[item.field]">
            <el-option v-for="option in item.options"
                       :key="option.value"
                       :label="option.label"
                       :value="option.value"
            />
          </el-select>
        </template>
<!--        日期选择器-->
        <template v-else-if="item.type === 'datePicker'">
          <el-date-picker :placeholder="item.placeholder" v-model="modelValue[item.field]"></el-date-picker>
        </template>
<!--        数字输入框-->
        <template v-else-if="item.type=== 'inputNumber'">
          <el-input-number v-model="modelValue[item.field]"/>
        </template>
<!--        单选框-->
        <template v-else-if="item.type === 'radio'">
          <el-radio-group v-model="modelValue[item.field]">
            <el-radio v-for="option in item.options"
                      :key="option.value"
                      :label="option.value"
            >{{option.label}}</el-radio>
          </el-radio-group>
        </template>
<!--        复选框-->
        <template v-else-if="item.type === 'checkbox'">
          <el-checkbox-group v-model="modelValue[item.field]">
            <el-checkbox v-for="option in item.options"
                         :key="option.value"
                         :label="option.value"
            >{{option.label}}</el-checkbox>
          </el-checkbox-group>
        </template>
<!--        开关-->
        <template v-else-if="item.type === 'switch'">
          <el-switch v-model="modelValue[item.field]"></el-switch>
        </template>
<!--        滑块-->
        <template v-else-if="item.type === 'slider'">
          <el-slider v-model="modelValue[item.field]"></el-slider>
        </template>
<!--        时间选择器-->
        <template v-else-if="item.type === 'timePicker'">
          <el-time-picker v-model="modelValue[item.field]"></el-time-picker>
        </template>
<!--        评分-->
        <template v-else-if="item.type === 'upload'">
          <el-upload v-model="modelValue[item.field]"></el-upload>
        </template>
<!--        颜色选择器-->
        <template v-else-if="item.type === 'colorPicker'">
          <el-color-picker v-model="modelValue[item.field]"></el-color-picker>
        </template>
<!--        级联选择器-->
        <template v-else-if="item.type === 'cascader'">
          <el-cascader v-model="modelValue[item.field]"></el-cascader>
        </template>
<!--        上传-->
        <template v-else-if="item.type === 'upload'">
          <el-upload v-model="modelValue[item.field]"></el-upload>
        </template>
      </el-form-item>
    </template>
  </el-form>
  <div class="bottom" :style="style.bottom">
    <slot name="bottom"></slot>
  </div>
</template>

<script setup lang="ts">
import {defineProps,ref} from "vue";

const props = defineProps({
  labelWidth: {
    type: String,
    default: '80px'
  },
  style:{
    type: Object
  },
  inline:{
    type: Boolean,
    default: false
  },
  labelPosition:{
    type: String,
    default: 'left'
  },
  rules:{
    type: Object
  },
  formItems: {
    type: Array
  },
  modelValue:{
    type: Object
  }
})

// 重置方法 重置表单
const ruleFormRef = ref()
const resetForm = ()=>{
  ruleFormRef.value?.resetFields()
}


//暴露方法
defineExpose({
  resetForm
})

</script>

<style scoped>

</style>