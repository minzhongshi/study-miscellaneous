<script setup lang="ts">
/**
 * - created 元素初始化
 * - beforeMount 指令绑定到元素后调用 只调用一次
 * - mounted 元素插入父级dom调用
 * - beforeUpdate 元素被更新前调用
 * - updated 元素被更新后调用
 * - beforeUnmount 元素移除前调用
 * - unmounted 元素被移除后调用
 */
/**
 * DirectiveBinding:与返回参数一致，使用来约束类型
 * export interface DirectiveBinding<V = any> {
 *     instance: ComponentPublicInstance | null;
 *     value: V;
 *     oldValue: V | null;
 *     arg?: string;
 *     modifiers: DirectiveModifiers;
 *     dir: ObjectDirective<any, V>;
 * }
 */
import {Directive, DirectiveBinding} from "vue";
import A from "./A.vue";
type Dir = {
  background:string
}
const vMove:Directive = {
  created(){
    console.log('------created-------')
  },
  beforeMount(){
    console.log('------beforeMount-------')
  },
  mounted(el:HTMLElement,dir:DirectiveBinding<Dir>){
    console.log('------mounted-------')
    el.style.background = dir.value.background
  },
  beforeUpdate(){
    console.log('------beforeUpdate-------')
  },
  updated(){
    console.log('------updated-------')
  },
  beforeUnmount(){
    console.log('------beforeUnmount-------')
  },
  unmounted(){
    console.log('------unmounted-------')
  }
}
</script>

<template>
<A v-move:aaa.smz="{background:'red'}"/>
</template>

<style scoped>

</style>