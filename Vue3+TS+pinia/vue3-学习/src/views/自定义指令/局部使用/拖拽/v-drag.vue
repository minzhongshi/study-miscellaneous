<script setup lang="ts">
/**
 * Element.firstElementChild：只读属性，返回对象第一个子元素，没有则返回Null
 * Element.clientX:只读属性,元素距离视口左边的距离（中心点）
 * Element.offsetLeft：只读属性，元素左上角距离视口左边的距离
 * Element.offsetWidth:元素宽度
 * Element.offsetHeight:元素高度
 * window.innerWidth：可视窗宽度
 * window.innerHeight：可视窗高度
 */
import {Directive, DirectiveBinding} from "vue";

const vDrea:Directive<any,void> = (el:HTMLElement,binding:DirectiveBinding)=>{
  let gap = 10
  let moveElement:HTMLDivElement = el.firstElementChild as HTMLDivElement
  const mouseDown = (e:MouseEvent)=>{
    console.log(window.innerHeight)
    let X = e.clientX - el.offsetLeft
    let Y = e.clientY - el.offsetTop
    const move = (e:MouseEvent)=>{
      let x = e.clientX - X
      let y = e.clientY - Y
      //超出边界判断
      if (x<=gap){
        x = 0
      }
      if (y<=gap){
        y = 0
      }
      if (x>= window.innerWidth -el.offsetWidth -gap){
        x = window.innerWidth -el.offsetWidth
      }
      if (y>= window.innerHeight - el.offsetHeight-gap){
        y = window.innerHeight - el.offsetHeight
      }

      el.style.left = x + 'px'
      el.style.top = y + 'px'
    }
    // 鼠标移动
    document.addEventListener('mousemove',move)
    //松开鼠标
    document.addEventListener('mouseup',()=>{
      //清除移动事件
      document.removeEventListener('mousemove',move)
    })
  }
  //鼠标按下
  moveElement.addEventListener('mousedown',mouseDown)
}
</script>

<template>
  <div v-drea class="box">
    <div class="header"></div>
    <div>内容</div>
  </div>
</template>

<style lang="less" scoped>
.box{
  position: fixed;
  width: 300px;
  height: 250px;
  border: solid 1px black;
  .header{
    height: 30px;
    background-color: black;
  }
}
</style>