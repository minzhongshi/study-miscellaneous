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
import {defineAsyncComponent, markRaw, reactive, ref, shallowRef} from "vue";
import A from "./components/组件/动态组件/A.vue";
import B from "./components/组件/动态组件/B.vue";
import C from "./components/组件/动态组件/C.vue";
import Skeleton from "./components/组件/异步组件/skeleton.vue";
import Loading from "./components/组件/Teleport传送组件/Loading.vue";
import KeepA from "./components/组件/keep-alive/keep-A.vue";
import KeepB from "./components/组件/keep-alive/keep-B.vue";
import Index2 from "./components/组件/transition动画过度组件/index.vue";
import GSAP from "./components/组件/transition动画过度组件/GSAP.vue";
import TSG from "./components/组件/transition动画过度组件/transitionGroup.vue";

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

//异步组件
const SyncVue = defineAsyncComponent(()=>import('coms/组件/异步组件/sync.vue'))
const SyncVue2 = defineAsyncComponent({
  // 加载异步组件时使用的组件
  loader: () => import('coms/组件/异步组件/sync.vue'),
  // 异步加载的等待组件
  loadingComponent: Skeleton,
  // 加载失败时使用的组件
  errorComponent: Skeleton,
// 在显示加载组件之前延迟。默认值：200ms。
  delay: 1000,
  // 超过给定时间，则会显示错误组件。默认值：Infinity。
  timeout: 3000
})

// 缓存组件
const flag = ref<boolean>(true)
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
<!--动态组件-->
<!--    <div style="display: flex" >-->
<!--      <div @click="switchCom(item,index)" :class="[active === index ? 'active': '']" class="tabs" v-for="(item,index) in data2">-->
<!--        <div>{{item.name}}</div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <component :is="comId"></component>-->
<!--  异步组件-->
<!--  <Suspense>-->
<!--    <div>-->
<!--      <SyncVue/>-->
<!--&lt;!&ndash;      <SyncVue2/>&ndash;&gt;-->
<!--    </div>-->
<!--    &lt;!&ndash;    加载异步时执行下面&ndash;&gt;-->
<!--    <template #fallback>-->
<!--      <Skeleton/>-->
<!--    </template>-->
<!--  </Suspense>-->
<!--  传送组件-->
<!--    <div class="teleport">-->
<!--      <Teleport to="body" :disabled="false">-->
<!--        <Loading/>-->
<!--      </Teleport>-->
<!--    </div>-->
<!--  缓存组件-->
<!--  <div>-->
<!--    <el-button type="primary" @click="flag = !flag">切换组件</el-button>-->
<!--    <keep-alive>-->
<!--      <keep-a v-if="flag"/>-->
<!--      <keep-b v-else/>-->
<!--    </keep-alive>-->
<!--  </div>-->
<!--过度组件-->
  <index2/>
  <GSAP/>
  <TSG/>
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
.teleport{
  height: 50vh;
  background-color: #6fc3df;
  position: relative;
}
</style>
