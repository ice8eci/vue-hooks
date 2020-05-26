<template>
  <div class="demo-container">
    <h2>useLocalStorage</h2>
    <p>将状态持久化存储在localStorage中的hook</p>
    <demo1></demo1>
    <demo2></demo2>
    <demo3></demo3>
  </div>
</template>

<script>
import Demo1 from './Demo1.vue';
import Demo2 from './Demo2.vue';
import Demo3 from './Demo3.vue';
export default {
  name: 'useLocalStorageState',
  components: {
    Demo1,
    Demo2,
    Demo3,
  },
  setup() {
  },
};
</script>

<style>

</style>
