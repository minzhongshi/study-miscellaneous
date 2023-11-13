<template>
  <div class="box">
    <select class="theme-select" v-model="theme">
      <option value="OS">跟随系统</option>
      <option value="light">浅色主题</option>
      <option value="dark">深色主题</option>
    </select>
    <span class="text">Theme Switch</span>
  </div>
</template>

<script setup lang="ts">
import useTheme from "../../utils/useTheme";
const {theme} = useTheme()
</script>

<style lang="scss" scoped>
.box{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 auto;
  text-align: center;
  @include useTheme() {
    background: getVal(bgColor);
    color: getVal(textColor);
    border-color: getVal(textColor);
  }
}
.theme-select{
  font-size: inherit;
  padding: 5px 20px;
  background: lightslategray;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.text{
  font-size: 4em;
  @include useTheme() {
    background-color: getVal(bgColor);
    color: getVal(textColor);
    border-color: getVal(textColor);
  }
}
</style>