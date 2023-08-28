<script setup lang="ts">
import {onActivated, onDeactivated, onMounted, onUnmounted, reactive, ref} from "vue";

/**
 * keep-alive:用于将某些组件缓存起来，不会卸载模板
 *   上面有三个属性：
 *      1、include:[String,RegRxp,Array] 名称匹配的才会缓存
 *      2、exclude:[String,RegRxp,Array] 名称匹配的不会被缓存
 *      3、max:[String,Number] 最多可以缓存的组件实例数量
 * 初始进入时会触发：onMounted（只执行一次）--->onActivated
 * 关闭时触发：onDeactivated(不会触发onUnMounted)
 * 再次进入不会触发 onMounted
 *
 * 注：只有开启keep-alive 才会有onActivated、onDeactivated两个周期
 *     并且只能有一个根结点
 * 场景：切换组件页面时需要保存原组件页面数据
 *
 */
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
onMounted(()=>{
  console.log("初始化")
})
onActivated(()=>{
  console.log("keep-alive初始化")
})
onDeactivated(()=>{
  console.log("keep-alive卸载")
})
onUnmounted(()=>{
  console.log("卸载")
})
</script>

<template>
  <div>
    <p>我是组件A</p>
    <el-form :model="form" label-width="120px">
      <el-form-item label="Activity name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker
              v-model="form.date1"
              type="date"
              placeholder="Pick a date"
              style="width: 100%"
          />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-time-picker
              v-model="form.date2"
              placeholder="Pick a time"
              style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>