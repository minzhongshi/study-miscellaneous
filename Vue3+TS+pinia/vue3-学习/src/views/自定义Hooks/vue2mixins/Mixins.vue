<script lang="ts">
/**
 * 在组件内部可以直接使用Mixins中的变量等
 * 在组件定义的变量会将Mixins中的同名变量覆盖掉
 */
import {defineComponent} from 'vue'
import common from '../../../common/mixins/common'

export default defineComponent({
  name: "Mixins",
  mixins:[common],
  beforeCreate() {
    console.log("组件--beforeCreate")
  },
  created() {
    console.log("组件--created")
  },
  beforeMount() {
    console.log("组件--beforeMount")
  },
  mounted() {
    console.log("组件--mounted")
  }
})
</script>

<template>

</template>

<style scoped>

</style>