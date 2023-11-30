<template>
<template v-if="formState">
    <el-form-item :label="formState.payload.label">
      <template v-if="formState.type === 'input'">
        <el-input v-model="formState.payload.value" />
      </template>
      <template v-else-if="formState.type === 'select'">
        <el-select v-model="formState.payload.value">
          <el-option v-for="item in formState.payload.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </template>
      <template v-else-if="formState.type === 'radio'">
        <el-radio-group v-model="formState.payload.value">
          <el-radio v-for="item in formState.payload.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-radio-group>
      </template>
      <template v-else-if="formState.type === 'checkbox'">
        <el-checkbox-group v-model="formState.payload.value">
          <el-checkbox v-for="item in formState.payload.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-checkbox-group>
      </template>
    </el-form-item>
  <FormItemComp :form-state="getNext()"></FormItemComp>
</template>
</template>

<script setup lang="ts">
import {FormItem} from "../../utils/动态表单/FormItem";

const props = defineProps<{
  formState: FormItem | null
}>()


function getNext(): FormItem | null {
  let current: FormItem | null = props.formState
  if (!current) {
    return null
  }
  const ancients = [];
  while ((current = current.parent)) {
    ancients.unshift(current);
  }
  return props.formState!.next(props.formState!, ancients);
}
</script>

<style scoped>
.ant-form-item-label {
  padding-right:10px !important;
}
</style>