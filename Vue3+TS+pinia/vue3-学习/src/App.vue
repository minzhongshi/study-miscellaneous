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
import {defineAsyncComponent, markRaw, reactive, ref, shallowRef,createVNode,render} from "vue";
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
import LazyDireect from "./views/自定义指令/监听是否出现在视口指令v-lazy-ob/lazyDireect.vue";
import Vmove from "./views/自定义指令/局部使用/index.vue";
import VHasShow from "./views/自定义指令/局部使用/鉴权/v-has-show.vue";
import VDrag from "./views/自定义指令/局部使用/拖拽/v-drag.vue";
import Mixins from "./views/自定义Hooks/vue2mixins/Mixins.vue";
import Hooks from "./views/自定义Hooks/Hooks-图片转Base64/Hooks.vue";
import HooksR from "./views/自定义Hooks/Hooks-监听元素宽高/Hooks-R.vue";
import Postcss from "./views/postcss转换/postcss.vue";
import H from "./views/三种编程风格/H.vue";
import EnvironmentVariable from "./views/环境变量/EnvironmentVariable.vue";
import Forms from "./views/二次封装ElementPlus/form.vue";

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
// 路由
window.addEventListener(
    "hashchange",
    function (e) {
      console.log("The hash has changed!",e);
    },
    false,
);
window.addEventListener("popstate", () => {
  let currentState = history.state;
  console.log("currentState", currentState);
});
import {useRouter} from 'vue-router'
import Login from "./views/路由/前置守卫/Login.vue";
const router = useRouter()

const toPage=(url:string)=>{
  // 字符串
  // router.push(url)
  // 对象形式
  // router.push({
  //   path:url,
  //   // name:'A',
  //   query:{
  //     name:'smz',
  //     age:18
  //   }
  // })
  router.push({
     name:'A',
    params:{
      id:1
    }
  })
  // router.replace(url)
}
//animate.css
import 'animate.css'
import PictureToning from "./components/其他/图片调色盘/pictureToning.vue";
import TopicSwitch from "./components/主题切换/TopicSwitch.vue";
import Slidein from "./views/自定义指令/元素平滑上升/slidein.vue";
import showMsg from "./components/组件/命令式组件/showMsg.jsx";
import FormPage from "./views/其它/动态表单/FormPage.vue";

const clickHandler = ()=>{
  showMsg('我是弹窗',(close)=>{
    console.log('我是弹窗回调')
    close()
  })
}
</script>

<template>
<!--  <Father />-->

<!--  <EventTest/>-->
<!--mitt-->
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
    <div style="display: flex" >
      <div @click="switchCom(item,index)" :class="[active === index ? 'active': '']" class="tabs" v-for="(item,index) in data2">
        <div>{{item.name}}</div>
      </div>
    </div>
    <component :is="comId"></component>
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
<!--  <index2/>-->
<!--  <GSAP/>-->
<!--  <TSG/>-->
<!--  图片懒加载 -->
<!--  <lazy-direect/>-->
<!--  自定义指令-局部使用-->
<!--  <Vmove/>-->
<!--  自定义指令-鉴权-->
<!--  <v-has-show/>-->
<!--  自定义指令-拖拽-->
<!--    <v-drag />-->
<!--  自定义Hooks-vue2Mixins-->
<!--  <Mixins/>-->
<!--  自定义Hooks-图片转64-->
<!--  <Hooks/>-->
<!--  自定义Hooks-监听元素宽高-->
<!--  <Hooks-R/>-->
<!--  postcss转换插件-->
<!--  <postcss />-->
<!--  函数式编程-->
<!--  <H/>-->
<!--  环境变量-->
<!--  <EnvironmentVariable />-->
<!--  路由-->
<!--  <p>-->
<!--    &lt;!&ndash;使用 router-link 组件进行导航 &ndash;&gt;-->
<!--    &lt;!&ndash;通过传递 `to` 来指定链接 &ndash;&gt;-->
<!--    &lt;!&ndash;`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签&ndash;&gt;-->
<!--    <router-link replace to="/A">Go to Router-A</router-link>-->
<!--    <br/>-->
<!--    <router-link :to="{name:'B'}">Go to Router-B</router-link>-->
<!--    <br/>-->
<!--    <router-link :to="{name:'C'}">Go to Router-C</router-link>-->
<!--    <br>-->
<!--    <button @click="toPage('/A')">跳转至A</button>-->
<!--  </p>-->
<!--  &lt;!&ndash; 路由出口 &ndash;&gt;-->
<!--  &lt;!&ndash; 路由匹配到的组件将渲染在这里 &ndash;&gt;-->
<!--    <router-view></router-view>-->
<!--前置守卫-->
<!--  <router-view v-slot="{ route,Component }">-->
<!--    <transition :enter-active-class="`animate__animated ${route.meta.transition}`">-->
<!--      <component :is="Component" />-->
<!--    </transition>-->
<!--  </router-view>-->
<!--  横向滚动-->
<!--  <div style="width: 100%;height: 100vh;background-color: black">-->
<!--    <div style="height: 800px;width: 100%">-->
<!--      <XScroll>-->
<!--        <div style="display: flex">-->
<!--          <div><img src="https://fakeimg.pl/800x600/?text=1" alt=""></div>-->
<!--          <div><img src="https://fakeimg.pl/800x600/?text=2" alt=""></div>-->
<!--          <div><img src="https://fakeimg.pl/800x600/?text=3" alt=""></div>-->
<!--          <div><img src="https://fakeimg.pl/800x600/?text=4" alt=""></div>-->
<!--          <div><img src="https://fakeimg.pl/800x600/?text=5" alt=""></div>-->
<!--        </div>-->
<!--      </XScroll>-->
<!--    </div>-->
<!--  </div>-->
<!--  图片调色盘-->
<!--  <picture-toning/>-->
<!--  二次封装elementPlus-->
<!--  <Forms/>-->
<!--  主题切换-->
<!--  <TopicSwitch />-->
<!--  元素平滑上升-->
<!--  <Slidein/>-->
<!--  指令式组件-->
<!--  <div>-->
<!--    <el-button @click="clickHandler" type="primary">打开弹窗</el-button>-->
<!--  </div>-->
<!--  动态表单-->
<!--  <FormPage/>-->
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
