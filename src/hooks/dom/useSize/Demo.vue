<template>
  <div class="demo-container">
    <h2>useSize</h2>
    <p>一个用于监听dom节点尺寸变化的hook</p>
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
  name: 'useSize',
  components: {
    Demo1,
    Demo2,
    Demo3,
  },
  setup() {}
}
</script>

<style>

</style>
