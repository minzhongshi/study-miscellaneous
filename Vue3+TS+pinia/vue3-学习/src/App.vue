<script setup lang="ts">
import Father from "./views/组件通讯/01_props/Father.vue";
import EventTest from "./views/组件通讯/02_custom-event/EventTest.vue";
import EventBusTest from "./views/组件通讯/03_custom-bus/EventBusTest.vue";
import ModelTest from "./views/组件通讯/04_v-model/ModelTest.vue";
import AttrsListenersText from "./views/组件通讯/05_userAttrs/AttrsListenersText.vue";
import RefChildrenParentText from "./views/组件通讯/06_ref-children-parent/RefChildrenParentText.vue";
import Ref from "./views/vue3_响应式/ref全家桶/ref.vue";
import AntiShake from "./views/vue3_响应式/ref全家桶/customRef实现防抖/antiShake.vue";
import Reactive from "./views/vue3_响应式/reactive全家桶/reactive.vue";
import BEM_layout from "./views/BEM架构与layout布局/BEM_layout.vue";
import SzieDireect from "./views/自定义指令/监听宽高指令v-size-ob/szieDireect.vue";
import ProvideInjectTest from "./views/组件通讯/07_provide-inject/ProvideInjectTest.vue";
import Index from "./views/组件通讯/08_pinia/index.vue";
import SlotTest from "./views/组件通讯/09_slot/SlotTest.vue";
import Card from "./components/组件/全局组件/Card.vue";
import Tree from "./components/组件/递归组件/Tree.vue";
import {markRaw, reactive, ref, shallowRef} from "vue";
import A from "./components/组件/动态组件/A.vue";
import B from "./components/组件/动态组件/B.vue";
import C from "./components/组件/动态组件/C.vue";

// 递归组件
interface Tree {
  name: string,
  checked: boolean,
  children?: Tree[]
}
const data = reactive<Tree[]>([
  {
    name: '1',
    checked: false,
    children: [
      {
        name: '1-1',
        checked: true,
      }
    ]
  },
  {
    name: '2',
    checked: false,
  },
  {
    name: '3',
    checked: false,
    children: [
      {
        name: '3-1',
        checked: false,
        children: [
          {
            name: '3-1-1',
            checked: false,
            children: [
              {
                name: '3-1-1-1',
                checked: false,
              }
            ]
          }
        ]
      },
      {
        name: '3-2',
        checked: false,
      }
    ]
  }
])

//动态组件
const data2 = reactive([
  {
    name: 'A组件',
    com: markRaw(A)
  },
  {
    name: 'B组件',
    com: markRaw(B)
  },
  {
    name: 'C组件',
    com: markRaw(C)
  }
])
const comId= shallowRef(A)
const active = ref(0)
const switchCom =(item,index)=>{
  comId.value = item.com
  active.value = index
}

</script>

<template>
<!--  <Father />-->
<!--  <EventTest/>-->
<!--  <EventBusTest/>-->
<!--  <ModelTest/>-->
<!--  <AttrsListenersText/>-->
<!--  <AntiShake/>-->
<!--  <ref/>-->
<!--  <reactive/>-->
<!--  <BEM_layout/>-->
<!--  <RefChildrenParentText></RefChildrenParentText>-->
<!--  <SzieDireect/>-->
<!--  <ProvideInjectTest/>-->
<!--  <Index/>-->
<!--  <SlotTest/>-->
<!--  <Card/>-->
<!--    <Tree :data="data"></Tree>-->
    <div style="display: flex" >
      <div @click="switchCom(item,index)" :class="[active === index ? 'active': '']" class="tabs" v-for="(item,index) in data2">
        <div>{{item.name}}</div>
      </div>
    </div>
    <component :is="comId"></component>
</template>

<style scoped>
.active {
  background-color: #6fc3df;
}
.tabs{
  border: 1px solid #ccc;
  padding: 5px 10px;
  margin-left: 5px;
  cursor: pointer;
}
</style>
