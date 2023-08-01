<script setup>
import {ref} from 'vue';
const number = ref(0);
const string = ref('string');
const boolean = ref(true);
const bigint = ref(9007199254740991)
const symbol = ref(Symbol())
const Null = ref(null)
console.log(number)
console.log(string)
console.log(boolean)
console.log(bigint)
console.log(symbol)
console.log(Null)

</script>

<template>

</template>

<style scoped>

</style>