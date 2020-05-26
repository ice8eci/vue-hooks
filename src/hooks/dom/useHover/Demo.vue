<template>
  <div class="demo-container">
    <h2>useHover</h2>
    <p>一个用于追踪dom元素是否有鼠标悬停的hook</p>
    <demo1></demo1>
    <demo2></demo2>
  </div>
</template>

<script>
import Demo1 from './Demo1';
import Demo2 from './Demo2';

export default {
  name: 'useHover',
  components: {
    Demo1,
    Demo2,
  },
  setup() {
  }
}
</script>

<style>

</style>
